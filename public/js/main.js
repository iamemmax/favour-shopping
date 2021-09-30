// toggle navbar on mobile
const menu = document.querySelector(".menu"),
        ul = document.querySelector("ul"),
        removeNav = document.querySelector(".remove")

        menu.addEventListener("click", (e) =>{
            ul.classList.add("show")
        })

        removeNav.addEventListener("click", (e) =>{
            ul.classList.remove("show")
        })



// show user information on clicking the user icon
const UserInfo = document.querySelector(".UserInfo"),
      userIcon = document.querySelector(".userIcon"),
      removeOnClick = document.querySelector(".removeOnClick")

      userIcon.addEventListener("click", (e) =>{
        UserInfo.classList.add("showUserInfo")
        removeOnClick.classList.add("showremove")
      })
      
      
      




    // add new product

    // const addNew  = document.querySelector("#addmore")


    // addNew.addEventListener("click", (e) =>{
    //     alert("you click")
    // })


    // cartegories selection
    const ProductCategory = document.querySelector(".categories")
    const  cateBtns = document.querySelectorAll(".cart")
    cateBtns.forEach(cateBtn =>{
      cateBtn.addEventListener("click", (e) =>{
        ProductCategory.querySelector(".active").classList.remove("active")
        cateBtn.classList.add("active")
      })
    })
        