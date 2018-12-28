

ajax({
    url : "/api/data",
    dataType:"json",
    success:function(data){
        var str = "";
        var len = Math.ceil(data/2);
        for(var i=1;i<data.length;i+=2){
            str +=`<div>
            <dl>
                <dt><img src=${data[i].img} alt=""></dt>
                <dd>
                    <p>【<span>${data[i].name} </span>】</p>
                    <b>${data[i].price} </b>
                </dd>
            </dl>
            <dl>
                <dt><img src=${data[i-1].img} alt=""></dt>
                <dd>
                    <p>【<span>${data[i-1].name} </span>】</p>
                    <b>${data[i-1].price} </b>
                </dd>
            </dl>
        </div>`
        };
        main.innerHTML=str;
    }
})



btn.onclick=function(){
    console.log(11)
    var cont = inp.value;
    if(cont){
    console.log(cont)

        ajax({
            url : "/api/serche",
            data : {name : cont},
            dataType:"json",
            success:function(data){
                var str = "";
        
        for(var i=1;i<data.length;i+=2){
            str +=`<div>
            <dl>
                <dt><img src=${data[i].img} alt=""></dt>
                <dd>
                    <p>【<span>${data[i].name} </span>】</p>
                    <b>${data[i].price} </b>
                </dd>
            </dl>
            <dl>
                <dt><img src=${data[i-1].img} alt=""></dt>
                <dd>
                    <p>【<span>${data[i-1].name} </span>】</p>
                    <b>${data[i-1].price} </b>
                </dd>
            </dl>
        </div>`
        };
        main.innerHTML=str;
            }
        })
    }
}