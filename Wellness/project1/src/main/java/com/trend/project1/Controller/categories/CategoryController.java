package com.trend.project1.Controller.categories;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    @GetMapping
    public List<String> getCategories() {
        return List.of("Home", "Dashboard", "Users", "Report", "Community");
    }

}
