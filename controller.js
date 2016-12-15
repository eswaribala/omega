/**
 * Created by BALASUBRAMANIAM on 15-12-2016.
 */
if(typeof omega === "undefined")
    omega={};

omega.controller={

    httpRequest:null,
    createAjaxObject:function()
    {
        try
        {
            this.httpRequest=new XMLHttpRequest();

        }
        catch(e)
        {
            try {
                this.httpRequest = new ActiveXObject("Msxml2.XMLHTTP3.0");
                console.log("Browser version is below IE 7");
            }
            catch(e)
            {
                console.log("Ajax object could not be created");
                return false;
            }
        }
        this.httpRequest.open("GET","https://maps.googleapis.com/maps/api/directions/json?origin=Bangalore,in&destination=chennai,in",true);
        //httpRequest.send("origin=Bangalore,in&destination=chennai,in");
        this.httpRequest.send();
        this.httpRequest.onreadystatechange=callbackResponse;
    }
};



function callbackResponse()
{
    if((omega.controller.httpRequest.readyState==4)&&(omega.controller.httpRequest.status==200))
    {
        //console.log(omega.controller.httpRequest.responseText);
        omega.model=omega.controller.httpRequest.responseText;
        console.log(omega.model);
    }

}