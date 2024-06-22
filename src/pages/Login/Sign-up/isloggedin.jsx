

export const isloggedin = () => {
    let data=localStorage.getItem("AccessToken");
    if (data != null) {
        return true;
    }
    else{
        return false;
    }

}


