// toggle navbar on mobile
const menu = document.querySelector(".menu"),
removeOnClick = document.querySelector(".removeOnClickAnywhere")
        ul = document.querySelector("ul")
        removeNav = document.querySelector(".remove")

        menu.addEventListener("click", (e) =>{
            ul.classList.add("show")
             removeOnClick.classList.add("showremove")

        })

        removeNav.addEventListener("click", (e) =>{
            ul.classList.remove("show")
            removeOnClick.classList.remove("showremove")

        })
        removeOnClick.addEventListener("click", (e) =>{
          ul.classList.remove("show")
          removeOnClick.classList.remove("showremove")
        })



// show user information on clicking the user icon
const UserInfo = document.querySelector(".UserInfo"),
      userIcon = document.querySelector(".userIcon")

      userIcon.addEventListener("click", (e) =>{
        UserInfo.classList.toggle("showUserInfo")
        removeOnClick.classList.add("showremove")
      })

      removeOnClick.addEventListener("click", (e) =>{
        UserInfo.classList.remove("showUserInfo")
        removeOnClick.classList.remove("showremove")
      })
      
      
      




    // add new product

    // const addNew  = document.querySelector("#addmore")


    // addNew.addEventListener("click", (e) =>{
    //     alert("you click")
    // })


    // cartegories selection
    const ProductCategory = document.querySelector(".categories")
    const  cateBtns = document.querySelectorAll(".cart")
    const  productContainer = document.querySelectorAll(".product_category")
    cateBtns.forEach(cateBtn =>{
      cateBtn.addEventListener("click", (e) =>{
        ProductCategory.querySelector(".active").classList.remove("active")
        cateBtn.classList.add("active")
        let cateSelect = cateBtn.getAttribute("data-name")
        
        productContainer.forEach(products => {
         let productSelect = products.getAttribute("data-select")
         if(productSelect === cateSelect || cateSelect === "all"){
           products.classList.remove("hideProduct")
           products.classList.add("showProduct")
         }else{
           products.classList.remove("showProduct")
          products.classList.add("hideProduct")
         }
        })
      })
    })
        