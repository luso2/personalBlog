package com.personalblog.controller;

import com.personalblog.entity.Blogger;
import com.personalblog.service.BloggerService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;

//  头像上传
@Controller
public class UploadHeadController {
    @Autowired
    private BloggerService bloggerService;
    @RequestMapping(value="/uploadhead",method= RequestMethod.POST)
    public void uploadHeadProtrait(HttpServletRequest request,HttpServletResponse response, @RequestParam(value = "headProtrait", required = false) MultipartFile file){
        try {
            request.setCharacterEncoding( "utf-8" );
            response.setHeader( "Content-Type" , "text/html" );
            String rootPath = request.getSession().getServletContext().getRealPath("WEB-INF/images");

            //验证头像后缀格式
            String[] nameSuffixs=file.getOriginalFilename().split("\\.");
            if (nameSuffixs.length < 2){
                response.getWriter().write("更换头像失败，头像格式需为png、jpg或gif");
            }
            String nameSuffix = nameSuffixs[1];
            if("jpg".equals(nameSuffix) || "png".equals(nameSuffix) || "gif".equals(nameSuffix)){
                /**
                 * 文件路径不存在则需要创建文件路径
                 */
                File filePath=new File(rootPath);
                if(!filePath.exists()){
                    filePath.mkdirs();
                }

                //  最终文件名
                File realFile=new File(rootPath+File.separator+file.getOriginalFilename());
//          FileUtils.copyInputStreamToFile(file.getInputStream(), realFile);
                if (!realFile.exists()){
                    file.transferTo(realFile);
                }
//          System.out.println(rootPath+File.separator+file.getOriginalFilename());
                HttpSession session = request.getSession();
                //  获取当前博主
                Blogger blogger = (Blogger)session.getAttribute("blogger");
                //  更改数据库头像
                String headPortraitURI = "resource/images/"+file.getOriginalFilename();
                bloggerService.updateHeadPortrait(headPortraitURI,blogger.getId());
                //  更改当前博主头像
                blogger.setHeadPortrait(headPortraitURI);
                session.setAttribute("blogger",blogger);
                response.getWriter().write(headPortraitURI);
            }else {
                response.getWriter().write("更换头像失败，头像格式需为png、jpg或gif");
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
