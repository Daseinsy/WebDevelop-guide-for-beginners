
function MM_jumpMenu(targ, selObj, restore) { //v3.0
    eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'");
    if (restore) selObj.selectedIndex = 0;
}
function checkForm() {
    var name = document.forms[0].user_name.value;
    if (name == "" || name == null) {
        alert("д");
        document.forms[0].user_name.focus();
        return false;
    }

    var email = document.forms[0].email.value;
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        alert("ȷַ ( .)");
        document.forms[0].email.focus();
        return false;
    }

    var age = document.forms[0].age.value;
    if (isNaN(age) || age == "") {
        alert("");
        document.forms[0].age.focus();
        return false;
    }

    if (!document.forms[0].agree.checked) {
        alert("");
        return false;
    }

    return true;
}

function MM_jumpMenu(targ, selObj, restore) { //v3.0
    eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'");
    if (restore) selObj.selectedIndex = 0;
}

function checkForm() {
  
    var name = document.forms[0].user_name.value;
    if (name == "" || name == null) {
        alert("д");
        document.forms[0].user_name.focus(); 
        return false;
    }

  
    var email = document.forms[0].email.value;
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        alert("dfsfd .)");
        document.forms[0].email.focus();
        return false;
    }

 
    var age = document.forms[0].age.value;
    if (isNaN(age) || age == "") {
        alert("");
        document.forms[0].age.focus();
        return false;
    }

  
    if (!document.forms[0].agree.checked) {
        alert("");
        return false;
    }

    return true;
}
