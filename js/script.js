var nameInputSingup = document.getElementById("nameInputSingup");
var emailInputSingup = document.getElementById("emailInputSingup");
var passInputSingup = document.getElementById("passInputSingup");
var emailInput = document.getElementById("emailInput");
var passInput = document.getElementById("passInput");
var validPargOne = document.getElementById("validOne");
var validPargTwo = document.getElementById("validTwo");
var signUpBtn = document.getElementById("signUpBtn");
var SinginBtn = document.getElementById("SinginBtn");
var loginBtn = document.getElementById("loginBtn");
var logoutBtn = document.getElementById("logoutBtn");
var paragraph = document.getElementById("paragraph");
// var homePage = document.getElementById("homePage");
var welcomUser = document.getElementById("welcomUser");
var homeLink = document.getElementById("homeLink");
var loginLink =document.getElementById("loginLink");
var regexForName = /^([A-Za-z]{5,10})(\s?[A-Za-z]{5,10})?$/;
var regexForEmail = /[a-z0-9]{5,10}@[a-z]{3,8}(\.com)$/;  
var regexForPass = /.{5,10}/;

if(localStorage.getItem("userinfo")==null) {
  var singUpList =[];
}
else {
  var singUpList = JSON.parse(localStorage.getItem("userinfo"));
}

if(nameInputSingup) {
  var inputValue = {
    nameInputSingupValue: nameInputSingup.value ,
    emailInputSingupValue: emailInputSingup.value ,
    passInputSingupValue: passInputSingup.value ,
  }
  
  
    function singUp() {
      inputValue = {
        nameInputSingupValue: nameInputSingup.value ,
        emailInputSingupValue: emailInputSingup.value ,
        passInputSingupValue: passInputSingup.value ,
      }
      
      if(nameInputSingup.value == "" || emailInputSingup.value == "" || passInputSingup.value == "" ) {
        validPargOne.innerHTML = "All inputs is required";
        notAllowed();
      }
      else if(regexForName.test(nameInputSingup.value) == false) {
        validPargOne.innerHTML = "Please Enter from 5 to 10 character in Your Name";
        notAllowed();
      }
      else if(regexForEmail.test(emailInputSingup.value) == false) {
        validPargOne.innerHTML = "Please Enter a valid email";
        notAllowed();
      }
      else if(regexForPass.test(passInputSingup.value) == false) {
        validPargOne.innerHTML = "Please Enter from 5 to 10 any character in Your Password";
        notAllowed();
      }
      else if( alreadyExists() == true) {
        validPargOne.innerHTML = "Sorry email already exists";
        notAllowed();
        signUpBtn.classList.replace("d-block" , "d-none");
        SinginBtn.classList.replace("d-none" , "d-block");
        paragraph.innerHTML = "";
      }
      else {
        validPargOne.innerHTML = "Success";
        validPargOne.classList.replace("text-danger","text-success");
        signUpBtn.classList.replace("d-block" , "d-none");
        SinginBtn.classList.replace("d-none" , "d-block");
        paragraph.innerHTML = "";
        clearInpute();
      }
      singUpList.push(inputValue);
    
      var strListOne = JSON.stringify(singUpList);
    
      localStorage.setItem( "userinfo" , strListOne);
      console.log(singUpList);
      console.log(singUpList.length);
    }
    
    signUpBtn.addEventListener("click" ,singUp);
    
    
    function alreadyExists() {
      for(var i = 0 ; i < singUpList.length ; i++) {
        if(singUpList[i].emailInputSingupValue == emailInputSingup.value) {
          return true ;
        }else {
          return false ;
        }
      }
    }
    
    function clearInpute() {
      nameInputSingup.value = "";
      emailInputSingup.value = "";
      passInputSingup.value = "";
    }
    
    function notAllowed() {
      singUpList.pop();
      var strListTwo = JSON.stringify(singUpList);
      localStorage.setItem( "userinfo" , strListTwo);
    }
    
    function newSingUp() {
      validPargOne.innerHTML = "";
      signUpBtn.classList.replace("d-none" , "d-block");
      SinginBtn.classList.replace("d-block" , "d-none");
      paragraph.innerHTML = `You have an account? <a href="index.html">Signin</a>`;
      validPargOne.classList.replace("text-success","text-danger");
    }
    
      nameInputSingup.addEventListener("focus" , newSingUp);
      emailInputSingup.addEventListener("focus" , newSingUp);
      passInputSingup.addEventListener("focus" , newSingUp);
}






function login() {
  for(var i = 0 ; i < singUpList.length ; i++) {
    if(emailInput.value == "" || passInput.value == "") {
      validPargTwo.innerHTML = "All inputs is required";
    }
    else if(singUpList[i].emailInputSingupValue == emailInput.value && singUpList[i].passInputSingupValue == passInput.value) {
      homeLink.setAttribute("href" , "home.html");
      localStorage.setItem("nameOfUser" , singUpList[i].nameInputSingupValue);
    }
    else {
      validPargTwo.innerHTML = "Email is not available";
    }
  }
}


if(loginBtn) {
  loginBtn.addEventListener("click" , login);
}

if(logoutBtn) {
  var userNameStorage = localStorage.getItem("nameOfUser");

  function Welcom() {
    welcomUser.innerHTML = `Welcom ${userNameStorage}`;
  }

  function logout() {
    localStorage.removeItem("nameOfUser");
  }
  logoutBtn.addEventListener("click" ,logout );
}



