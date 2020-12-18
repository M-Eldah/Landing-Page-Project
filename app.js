//Getting all the sections and putting in a Container which will act as an array
const Container = document.querySelectorAll("section");
//setting the Container that we will use to keep our navigation menu items
const NavContainer= document.querySelector("ul");
//header that we use to maniuplate the opacity of our navigation meny
const header = document.querySelector(".table");
//an int that we will use as an index as to which section is curently active
let activeSection=0 ;
//an int that we will use down in the checkArea function to keep a
//record of section as the biggest area in the view section
let largestarea =0;
//the function through an array and for each item in array create an Element
//and naming that Element and adding a an addEventListener which in this case will
//act as a navigation button
function addtonav(item,index)
{
  //goes through an array adding a li Element once for each loop
  const navitem =document.createElement("li")   ;
  //adding a text textContent to it by grabbing the name from data-nav
  navitem.textContent = item.dataset.nav;
  //adding an event addEventListener which listen to a click on li Element that we created
  navitem.addEventListener("click",function()
  {
    //linking it to item, so that when we click on the li element in the nav-bar inspect
    //it scrolls into view
    item.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
)
//setting the li element as a child of the Nav menu/bar container element
  NavContainer.appendChild(navitem);
}
//checking the area of a section which is currently in the view
function checkArea(item,i)
{
  //setting some int which will equal the area(technically only the length since we dont check the width )
  //on the screen, the top, top bottom
  let area = 0;//to be calculated
  let top = item.getBoundingClientRect().top; // distance from the top of a section to the top of the screen
  let bottom =item.getBoundingClientRect().bottom; // as above but from the bottom
  //checking if section is in the view port
  // if the top is lower than the bottom of the view port(bottom of screen = window.innerHeight) or
  // if the bottom is greater than the top of the view port (top=0)
  //in both casses the the section isn't in view and gets an area of 0
  if (top<innerHeight&&bottom>0)
  {
    //this condition checks if both top & bottom of a section is in view
    if (top>0&&bottom<innerHeight)
    {
      //if so the area =
     area= bottom-top;
    }
    //this if only the bottom is in view
    else if (top<0&&bottom<innerHeight)
    {
    // if so the area on screen = the bottom only
    area = bottom
    }
    //this checks if only the top is view
   else if (top>0&&bottom>innerHeight)
    {
    // area = the view height(innerHeight)- top
    area = innerHeight-top;
    }
    //the only other option left is if both the top is above the view and bottom is under view
    //then the the section is occuby the whole view so it's area is equal to the whole view(innerHeight)
    else
    {
    area=innerHeight;
    }
    }
    //this is the else conditional checking if the section is in view
    //if no then it's area = ZERO
    else {
    area=0;
    }
  //since this function is built for a loop to chech which section is most prominent in the screen
  //we will need to compare values to check the biggest one which this if conditional does
  //and that is why we needed the largestarea value to be outside the loop bec if not it would have been reset every
  //loop and rather than the biggest area being chosen, the last section with an area > 0 would have been chosen
  if(area>largestarea)
  {
    //area passes the if check, we make the largestarea = to it so the next area to be chosen
    // it must be greater than it
    largestarea=area;
    //we set the activeSection to the index so we can later highlight it
    activeSection=i;
  }
}
//adding addEventListener wich wait for dom to be DOMContent to be loaded
document.addEventListener("DOMContentLoaded",function()
{
  //preforming the addtonav to li element with a onclick event for even section in the page
  Container.forEach(addtonav);
  //scaling the height of each section to be 60% of viewport
  //i scaled so on smaller screens like mobiles we dont end up with super long sections
  //but section that will always be 60% of the screens
  //due to parent-child dependincies using height=60% in css doesn't work correctly
  //but in css we used overflow-y:scroll so even with shorter section on mobiles
  //the text doesn't become a mess
  Container.forEach((item, i) => {
  item.style.height=0.6*innerHeight+"px";
  });

});
//the event listen which listen to scrolls and set the following
document.addEventListener("scroll",function()
{ //it sets the navemenu opacity to 1 so it become visable
  header.style.opacity=1;
  //it preforms the function which find the section with largestarea on the screen
  //and sets it's index as the active section;
  Container.forEach(checkArea);
  //sets the largest to 0 so that current areas doesn't have to contend with the previous
  //largest area
  largestarea=0;
  //heighlight the section with largest section using activeSection value we got from checkArea
  //by sitting it's class to pinkdev class and sets the rest of the section class as bluedev
  //to reset them
  Container.forEach((item, i) => {
//checks if the i = to activeSection(index of the section with the largest area)
    if (i==activeSection) {
      //if so change it's class
      item.className="pinkdev";
      //and heighlight the li linked to it
      //the [i+1] is because the NavContainer has a hidden text element as a child before
      //the li element we added to li we added to it as children
      NavContainer.childNodes[i+1].className="pinkdev";
    }
    else {
      //same as before but if the the dont pass the if we reset the style by sitting them back to the
      //default class
      item.className="bluedev";
      NavContainer.childNodes[i+1].className="";
    }
  });
  //reset the activeSection
  activeSection=0;
  //a timeout set up to return the opacity of the navemenu to 0 after 3 seconds
  setTimeout(function(){ header.style.opacity=0; }, 3000);
})
