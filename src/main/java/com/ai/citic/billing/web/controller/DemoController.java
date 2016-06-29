package com.ai.citic.billing.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/demo")
public class DemoController {

    @RequestMapping("/toDemo")
    public ModelAndView toDemo(){
        ModelAndView view = new ModelAndView("demo/commlabel");

        return view;
    }

    @RequestMapping("/toBillSearch")
    public ModelAndView toBillSearch(){
        ModelAndView view = new ModelAndView("jsp/bill/billSearch");

        return view;
    }
}
