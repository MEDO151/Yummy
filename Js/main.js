

let htmlRow = document.querySelector('.row.g-4')

$(document).ready(function(){
    $('.nav-tab').animate({ left : "-256.562px" } , 500)
    $('.links ul li').animate({ top : '300px' } , 500)
    $('.open-icon').click(function(){
        
        let navTabWidth = $('.nav-tab').outerWidth(true);
    
        if( $('.nav-tab').css('left') == "0px" ){
            $('.nav-tab').animate({ left : -navTabWidth }, 500);
            $('.links ul li').animate({ top : '300px' } , 500)

        }else{
            $('.nav-tab').animate({ left : '0px' }, 500);
            for(let i = 0; i < $('.links ul li').length ; i++){
                $('.links ul li').eq(i).animate({ top : "0" } , (i + $('.links ul li').length) * 100)
            }
        }
        $('.open-icon').toggleClass('fa-align-justify').toggleClass('fa-x')
    })
    function getMeals(meal) {
        let row = "";
        for(let i = 0 ; i < meal.meals.length ; i++){
            
            row +=
            `<div class="col-md-3">
                <div class="meal position-relative rounded-2 overflow-hidden">
                    <img src="${meal.meals[i].strMealThumb}" class="w-100" alt="">
                    <div class="position-absolute layer">
                        <h3>${meal.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            `
        }
        htmlRow.innerHTML = row;
    }
    async function getApi(){
        $('.loading-screen').fadeIn(0);
        let api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        let request = await api.json()
        getMeals(request)
        getId(request)
        $('.loading-screen').fadeOut(500);
        $('body').css('overflow', 'visible');
    }
    getApi()

    function getId(id){
        for (let i = 0; i < $('.meal').length; i++) {
            $('.meal').eq(i).click(function(){
                htmlRow.innerHTML = ""
                $('.search').css("display", "none")
                IdNum = id.meals[i].idMeal
                getApiForInfo(IdNum)
            })
        }
    }
    
    async function getApiForInfo(Id) {
        $('.loading-screen').fadeIn(0);
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`)
        let request = await api.json()
        displayInfo(request)
        $('.loading-screen').fadeOut(500);
        $('body').css('overflow', 'visible');
    }
    

    

    function displayInfo(id){
        htmlRow.innerHTML = `
        <div class="col-md-4" >
            <div class="text-white">
                <img src="${id.meals[0].strMealThumb}" class="w-100 rounded-3" alt="" />
                <h2>${id.meals[0].strMeal}</h2>
            </div>
        </div>
        <div class="col-md-8">
            <div class="text-white">
                <h2>Instructions</h2>
                <p>${id.meals[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area :</span> ${id.meals[0].strArea} </h3>
                <h3><span class="fw-bolder">Category :</span> ${id.meals[0].strCategory} </h3>
                <h3>Recipes : </h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${liForRecipes(id)}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${liForTags(id)}
                </ul>
                <a target="_blank" href="${id.meals[0].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${id.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        </div>
        `
    }

    function liForRecipes(id){
        let ingredients = ``
        for (let i = 1; i <= 20 ; i++) {
            let name = `strMeasure${i}`
            let name2 = `strIngredient${i}` 
    
            if(id.meals[0][name] != " " && id.meals[0][name2] != ""){
                ingredients += `<li class="alert alert-info m-2 p-1">${id.meals[0][name]} ${id.meals[0][name2]}</li>`
            }
        }
    
        return ingredients
    
    }
    
    function liForTags(id){
    
        let tagsStr = ``
        if(id.meals[0].strTags != null){
            for (let i = 0; i < id.meals[0].strTags.split(",").length; i++) {
                tagsStr += `<li class="alert alert-danger m-2 p-1">${id.meals[0].strTags.split(",")[i]}</li>`
            }
        }
        return tagsStr
    
    }
    
    $('.links ul li').eq(0).click(function(){
        $('.links ul li').animate({ top : '300px' } , 500)
        htmlRow.innerHTML = ""
        $('.nav-tab').animate({ left : "-256.562px" } , 500)
        $('.open-icon').toggleClass('fa-align-justify').toggleClass('fa-x')
        $('.search').css("display", "flex")
        searchName()
        searchFLetter()
    })
    
    async function getApiSearchByName(name){
        $('.loading-screen').fadeIn(0);
        $('body').css('overflow', 'hidden');
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        let request = await api.json(500)
        getMeals(request)
        getId(request)
        console.log(request);
        $('.loading-screen').fadeOut(500);
    }
    
    function searchName(){
        $('.by-name').keyup(function(){
            getApiSearchByName(document.querySelector(".by-name").value)
        })
    }
    
    async function getApiSearchByFLetter(FLetter){
        $('.loading-screen').fadeIn(0);
        $('body').css('overflow', 'hidden');
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FLetter}`)
        let request = await api.json()
        getMeals(request)
        getId(request)
        console.log(request);
        $('.loading-screen').fadeOut(500);
    }
    
    function searchFLetter(){
        $('.by-f-letter').keyup(function(){
            getApiSearchByFLetter(document.querySelector(".by-f-letter").value) 
        })
    }
    async function getApiCategories(){
        $('.loading-screen').fadeIn(500);
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`) 
        let request = await api.json()
        displayCategories(request)
        getIdCategories(request)
        $('.loading-screen').fadeOut(500);
    }
    getApiCategories()
    
    function displayCategories(meal){
        $('.links ul li').eq(1).click(function(){
            $('.search').css("display", "none")
            $('.links ul li').animate({ top : '300px' } , 500)
            htmlRow.innerHTML = ""
            $('.nav-tab').animate({ left : "-256.562px" } , 500)
            $('.open-icon').toggleClass('fa-align-justify').toggleClass('fa-x')
            let row = "";
            for(let i = 0 ; i < meal.categories.length ; i++){
                
                row +=
                `<div class="col-md-3">
                    <div class="categories-meal position-relative rounded-2 overflow-hidden">
                        <img src="${meal.categories[i].strCategoryThumb}" class="w-100" alt="">
                        <div class="position-absolute layer d-flex flex-column text-center">
                            <h3>${meal.categories[i].strCategory}</h3>
                            <p>${meal.categories[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
                `
                
            }
            htmlRow.innerHTML = row;
            getIdCategories(meal)
        })
        
    }
    
    function getIdCategories(id) {
        for (let i = 0; i < $('.categories-meal').length; i++) {
            $('.categories-meal').eq(i).click(function () {
                getApiCategoriesInfo(id.categories[i].strCategory)
            })
        }
    }

    async function getApiCategoriesInfo(caregory){
        $('.loading-screen').fadeIn(0);
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${caregory}`)
        let request = await api.json()
        console.log(request);
        getMeals(request)
        getId(request)
        $('.loading-screen').fadeOut(500);
    }

    async function getApiArea(){
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        let request = await api.json()
        displayArea(request)
        
    }
    getApiArea()
    function displayArea(area) {
        $('.links ul li').eq(2).click(function(){
            $('.search').css("display", "none")
            $('.links ul li').animate({ top : '300px' } , 500)
            htmlRow.innerHTML = ""
            $('.nav-tab').animate({ left : "-256.562px" } , 500)
            $('.open-icon').toggleClass('fa-align-justify').toggleClass('fa-x')
            let row = "";
            for(let i = 0 ; i < area.meals.length ; i++){
                
                row +=
                `<div class="col-md-3">
                    <div class="Area text-center cursor-pointer text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area.meals[i].strArea}</h3>
                    </div>
                </div>
                `
            }
            htmlRow.innerHTML = row;
            clickArea()
        })
    }

    async function getApiWithArea(key){
        $('.loading-screen').fadeIn(0);
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${key}`)
        let request = await api.json()
        getMeals(request)
        getId(request)
        $('.loading-screen').fadeOut(500);
    }

    function clickArea(){
        for (let i = 0; i < $('.Area').length ; i++) {
            $('.Area').eq(i).click(function () {
                getApiWithArea($('.Area h3').eq(i).html())
            })
        }
    }

    async function getApiIngredient(){
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        let request = await api.json()
        displayIngredient(request)
    }

    getApiIngredient()
    function displayIngredient(ingredient){
        $('.links ul li').eq(3).click(function(){
            $('.search').css("display", "none")
            $('.links ul li').animate({ top : '300px' } , 500)
            htmlRow.innerHTML = ""
            $('.nav-tab').animate({ left : "-256.562px" } , 500)
            $('.open-icon').toggleClass('fa-align-justify').toggleClass('fa-x')
            let row = "";
            for(let i = 0 ; i < ingredient.meals.length ; i++){
                if(ingredient.meals[i].strDescription != null && ingredient.meals[i].strDescription != ""){
                    row +=
                    `<div class="col-md-3">
                        <div class="ingredient text-center cursor-pointer text-white">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${ingredient.meals[i].strIngredient}</h3>
                            <p>${ingredient.meals[i].strDescription.slice(0, 60)}</p>
                        </div>
                    </div>
                    `
                }
            }
            htmlRow.innerHTML = row;
            clickIngredient()       
        })
    }
    async function getApiWithIngredient(key){
        $('.loading-screen').fadeIn(0);
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`)
        let request = await api.json()
        getMeals(request)
        getId(request)
        $('.loading-screen').fadeOut(500);
        $('body').css('overflow', 'visible');
    }

    function clickIngredient(){
        for (let i = 0; i < $('.ingredient').length ; i++) {
            $('.ingredient').eq(i).click(function () {
                getApiWithIngredient($('.ingredient h3').eq(i).html())
            })
        }
    }



    function displayContactUs(){
        $('.links ul li').eq(4).click(function(){
            $('.container').addClass('w-75')
            $('.search').css("display", "none")
            $('.links ul li').animate({ top : '300px' } , 500)
            htmlRow.innerHTML = ""
            $('.nav-tab').animate({ left : "-256.562px" } , 500)
            $('.open-icon').toggleClass('fa-align-justify').toggleClass('fa-x')
            
            htmlRow.innerHTML = `
                    <div class="col-md-6">
                        <input type="text" class="name form-control" placeholder="Enter Your Name">
                        <div class="alert name-alert alert-danger w-100 mt-2 d-none ">
                            Special characters and numbers not allowed and name must contain at least 3 characters
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input  type="email" class="email form-control " placeholder="Enter Your Email">
                        <div class="alert email-alert alert-danger w-100 mt-2 d-none">
                            Email not valid *exemple@gmail.com
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input  type="text" class="phone form-control " placeholder="Enter Your Phone">
                        <div class="alert phone-alert alert-danger w-100 mt-2 d-none">
                            Enter valid Phone Number
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input type="number" class="age form-control " placeholder="Enter Your Age">
                        <div class="alert age-alert alert-danger w-100 mt-2 d-none">
                            Age must start from 18 to 100
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input type="password" class="password form-control" placeholder="Enter Your Password">
                        <div class="alert password-alert alert-danger w-100 mt-2 d-none">
                            Enter valid password *Minimum eight characters, at least one letter and one number :*
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input type="password" class="repassword form-control" placeholder="Repassword">
                        <div class="alert repassword-alert alert-danger w-100 mt-2 d-none">
                            This password does not match your password
                        </div>
                    </div>
                    <button disabled="true" class="btn button btn-outline-danger px-2 mt-3">Submit</button>
                
            `     
            validationName()
            validationEmail()
            validationPhone()
            validationAge()
            validationPassword()
            validationRePassword()
            
        })
    }
    displayContactUs()

    function validationName(){
        $('.name').keyup(function(){
            nameValidation()
        })
    }
    function validationEmail(){
        $('.email').keyup(function(){
            emailValidation()
        })
    }
    function validationPhone(){
        $('.phone').keyup(function(){
            phoneValidation()
        })
    }
    function validationAge(){
        $('.age').keyup(function(){
            ageValidation()
        })
    }
    function validationPassword(){
        $('.password').keyup(function(){
            passwordValidation()
        })
    }
    function validationRePassword(){
        $('.repassword').keyup(function(){
            rePasswordValidation()
        })
    }

    function regexName(){
        let validName = /^[A-Za-z]{3,}$/
        return validName.test($('.name').val())
    }
    
    function nameValidation(){
        if(regexName() == false){
            $('.name-alert').removeClass('d-none')
        }else{
            $('.name-alert').addClass('d-none')
            
        }
        checked()
    }

    function regexEmail(){
        let validEmail = /^[A-Za-z]{3,}([0-9]{1,})?@(gmail|yahoo|icloud).com$/
        return validEmail.test($('.email').val())
    }

    function emailValidation(){
        if(regexEmail() == false){
            $('.email-alert').removeClass('d-none')
        }else{
            $('.email-alert').addClass('d-none')
            
        }
        checked()
    }

    function regexPhone(){
        let validEmail = /^(002)?(010|011|012|015)[0-9]{8}$/
        return validEmail.test($('.phone').val())
    }

    function phoneValidation(){
        if(regexPhone() == false){
            $('.phone-alert').removeClass('d-none')
        }else{
            $('.phone-alert').addClass('d-none')
            
        }
        checked()
    }
    
    function regexAge(){
        let validAge = /^(1[89]|[2-9]\d|100)$/
        return validAge.test($('.age').val())
    }

    function ageValidation(){
        if(regexAge() == false){
            $('.age-alert').removeClass('d-none')
        }else{
            $('.age-alert').addClass('d-none')
            
        }
        checked()
    }
    function regexPassword(){
        let validPassword = /^[a-zA-Z\d(!@#$%^&*)?]{8,}$/
        return validPassword.test($('.password').val())
    }

    function passwordValidation(){
        if(regexPassword() == false){
            $('.password-alert').removeClass('d-none')
        }else{
            $('.password-alert').addClass('d-none')
        }
        checked()
    }

    function regexRePassword(){
        
        return $('.password').val() === $('.repassword').val()
    }

    function rePasswordValidation(){
        if(regexRePassword() != true){
            $('.repassword-alert').removeClass('d-none')
        }else{
            $('.repassword-alert').addClass('d-none')
        }
        checked()
    }

    function checked(){
        if (regexName() && regexEmail() && regexPhone() && regexAge() && regexPassword() && regexRePassword())  {
            $(".button").removeAttr("disabled");
        } else {
            $(".button").attr("disabled", "disabled");
        }
    }

});
