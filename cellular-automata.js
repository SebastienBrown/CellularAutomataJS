function cellular_automaton(config,rule){

  //returns the first ".colorgrid" element found in the HTML document
  const gridelement=document.querySelector(".colorgrid"); 

  //length of the config array
  var len=config.length;

  //initializes a for loop
  for(let i=0;i<len;i++){
    const div = document.createElement("div");  //create a div element
    gridelement.appendChild(div); //appends the "div" element to the "gridelement" element

    //initializes an inner for loop to create the cells in each row
    for (let i=0;i<len;i++){
      let tile=document.createElement("div");

        //set various tile styles (height and width vary based on input array size)
        tile.style.height=((900/len)-2)+"px";    
        tile.style.width=((900/len)-2)+"px";
        tile.style.display="inline";    
        tile.style.position="relative";   
        tile.style.float="left";    
        tile.style.borderStyle="solid";   
        tile.style.borderWidth="1px";
        tile.style.borderColor="red";

        //cells that are "alive" (black) are represented by 1 in the config array
        if(config[i]==1){
          tile.style.backgroundColor="black";
        }
        //cells that are "dead" (white) are represented by 0 in the config array
        if(config[i]==0){
          tile.style.backgroundColor="white";
        }
        //appends the "tile" element to the previously created "div" element
        div.appendChild(tile);
    }
    //calls the applyRule function to update the state of config
    config=applyRule(config,rule);
  }

}

//updates the state of 
function applyRule(config, rule){

//len stores the length of config
len=config.length;

//creates an empty array config2 for storing the updated config array
const config2=[];

//copies each element of config to config2
for(i=0;i<len;i++){
  config2.push(config[i]);
}

//interprets rule and creates binary array to determine output of 8 potential states
  const rule_arr=new Array(8).fill(0);
  for (let j=7;j>=0;j--){
    var remaining=rule-2**j;
    if(remaining>=0){
      rule=remaining;
      rule_arr[-j+7]=1;
    }
  }

  //runs loop to update each cell of config 
    for(let l=0;l<len;l++){

      //stores state of left cell (applies periodic boundary conditions)
      if(l-1<0){
        var leftCell=config[(l-1)+len];
      }
      else{
        var leftCell=config[l-1];
      }
      
      //stores state of right cell (applies periodic boundary conditions)
      if(l+1==len){
        var rightCell=config[(l+1)%len];
      }
      else{
        var rightCell=config[l+1];
      }

      //stores state of middle cell
      midCell=config[l];

      //checks every possible initial state of leftCell,midCell and rightCell
      //to deduce the new state of the midCell in the updated config array
      //saves the new state of the cell at the corresponding index in config2
      if((leftCell==1 && midCell==1 && rightCell==1) && rule_arr[0]==1){
        config2[l]=1;
      }
      else if((leftCell==1 && midCell==1 && rightCell==0) && rule_arr[1]==1){
        config2[l]=1;
      }
      else if((leftCell==1 && midCell==0 && rightCell==1) && rule_arr[2]==1){
        config2[l]=1;
      }
      else if((leftCell==1 && midCell==0 && rightCell==0) && rule_arr[3]==1){
        config2[l]=1;
      }
      else if((leftCell==0 && midCell==1 && rightCell==1) && rule_arr[4]==1){
        config2[l]=1;
      }
      else if((leftCell==0 && midCell==1 && rightCell==0) && rule_arr[5]==1){
        config2[l]=1;
      }
      else if((leftCell==0 && midCell==0 && rightCell==1) && rule_arr[6]==1){
        config2[l]=1;
      }
      else if((leftCell==0 && midCell==0 && rightCell==0) && rule_arr[7]==1){
        config2[l]=1;
      }
      else{
        config2[l]=0;
      }
    } 
    
    //copies the state of each cell in config2 to config
    for(a=0;a<len;a++){
      config[a]=config2[a];
    }

    //returns the updated config array
    return config;
  }
  //used to run the tester code
  module.exports = { applyRule };





