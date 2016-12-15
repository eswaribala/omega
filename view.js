/**
 * Created by BALASUBRAMANIAM on 15-12-2016.
 */
if(typeof omega === "undefined")
    omega={};

window.onload=init;

function init()
{
  omega.view.display();
}

omega.view={

    display:function()
    {
        omega.controller.createAjaxObject();
        console.log(omega.model);
    }

}
