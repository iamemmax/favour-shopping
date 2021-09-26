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
      userIcon = document.querySelector(".userIcon")

      userIcon.addEventListener("mouseover", (e) =>{
        UserInfo.classList.add("showUserInfo")
      })
      UserInfo.addEventListener("mouseleave", (e) =>{
        UserInfo.classList.remove("showUserInfo")
      
      })
      
      




    // add new product

    const addNew  = document.querySelector("#addmore")


    addNew.addEventListener("click", (e) =>{
        alert("you click")
    })
