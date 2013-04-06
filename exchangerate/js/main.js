//货币汇率数组
var country = [];

//当前输入金额选项的id
var moneyId = "";

//当前输入的金额
var moneyNum = "";

//当输入币种转换为人民币的金额
var moneyCNNum = "";

//本地存储localStorage
var storage = window.localStorage;

//初始化
function init(){
    //人民币<-美元
    country[0] = 634.51;

    //人民币<-日元
    country[1] = 8.09;

    //人民币<-欧元
    country[2] = 800;

    //人民币<-欧元
    country[3] = 800;

    //人民币<-英镑
    country[4] = 1009.18;

    //人民币<-港币
    country[5] = 79.87;

    //r代表汇率设置,c代表汇率计算,i是循环变量
    var r, c,i;

    //点击设置返回时保存新设置的汇率
    $("#backAndSave").bind("click",function(){
        changeRates();
    });

    //检查是否有更新的汇率
    var allCountry = country.length;
    for(i=0;i<allCountry;i++){
        //判断是否有本地存储
        r = i+2;
        if(storage.getItem("r"+r)==null){
            //如果没有，将初始化的汇率写入本地
            storage.setItem("r"+r,country[i]);
        }else{
          //如果有，则将汇率写入对应的货币数组
            country[i]=storage.getItem("r"+r);
        }
    }

    //将汇率写入设置表单
    showER();

    //为汇率计算绑定事件
    for(i=0;i<=allCountry;i++){
        c = i+1;
        $("#c"+c).bind("keyup change",function(){
            this.value = toNumberAndPoint(this.value);
            exchangeRates(this);
        });
    }

    //给汇率设置绑定格式转换
    for(i=0;i<allCountry;i++){
        r = i+2;
        $("#r"+r).bind("keyup change",function(){
            this.value = toNumberAndPoint(this.value);
        });
    }
}

//格式数字,保留num位小数
function formatNum(str,num){
    var s = parseFloat(str);
    var n = num?num:4;
    if(isNaN(s)){
        return null;
    }
    s = s.toFixed(n);
    if(s==""||s<0){
        s=0;
    }
    return s;
}

//转换为数字格式，将字符串中非数字和小数点去掉
function toNumberAndPoint(str){
    return str.replace(/[^(\d|\.)]/g,'');
}

//货币兑换
function exchangeRates(str){
    moneyId = str.id;
    moneyNum = str.value;
    var moneyCNid = moneyId;
    moneyCNid = moneyCNid.substr(1,moneyId.length)-2;
    moneyCNNum = moneyNum*(country[moneyCNid]/100);
    var tempNum = 0;

    //计算所有金额
    var thisNum;
    $(".exchangeRates").find("input").each(function(){
        if(this.id != moneyId){
            //判断当前输入的是否为人民币c1
            if(moneyId=="c1"){
                if(this.id != "c1"){
                    thisNum = moneyNum*(100/country[tempNum]);
                    $(this).val(formatNum(thisNum,2));
                    tempNum++;
                }
            }else{
                if(this.id != "c1"){
                    thisNum = moneyCNNum*(100/country[tempNum]);
                    $(this).val(formatNum(thisNum,2));
                    tempNum++;
                }else{
                    $(this).val(formatNum(moneyCNNum,2));
                }
            }
        }else{
            if(moneyId !="c1"){
                tempNum++;
            }
        }
    });
}

//将汇率设置中的值传入本地及改变汇率数组中
function changeRates(){
    for(var i=0;i<country.length;i++){
        var r = i+2;
        storage.setItem("r"+r,$("#r"+r).val());
        country[i]=$("#r"+r).val();
    }
}

//将汇率写入汇率设置表单
function showER(){
    for(var i=0;i<country.length;i++){
        var r=i+2;
        $("#r"+r).val(country[i]);
    }
}

