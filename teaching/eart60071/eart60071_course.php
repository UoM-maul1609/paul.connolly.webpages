<!DOCTYPE html>
<html>
<head>
<title>Teaching materials for EART60071: Measuring and Predicting 2 </title>
<!-- Copyright (c) 2009-2013 The MathJax Consortium -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX","output/HTML-CSS"],
    tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
  });
</script>
<script type="text/javascript" src="../../MathJax/MathJax.js"></script>

<style>
h1 {text-align:center}
h2 {
  font-weight: bold;
  background-color: #DDDDDD;
  padding: .2em .5em;
  margin-top: 1.5em;
  border-top: 3px solid #666666;
  border-bottom: 2px solid #999999;
}
</style>
</head>
<body>

<noscript>
<div style="color:#CC0000; text-align:center">
<b>Warning: <a href="http://www.mathjax.org/">MathJax</a>
requires JavaScript to process the mathematics on this page.<br />
If your browser supports JavaScript, be sure it is enabled.</b>
</div>
<hr>
</noscript>
<h1>Teaching materials for EART60071: Measuring and Predicting 2</h1>

<h2>Module EART60071 Measuring and Predicting 2</h2>

<?php
if($_GET["ver"] == "2.0") {
$table1="<table style='width:90%'>

  <tr>
  <td>
  <a href='materials/eart60071_preamble.pdf' target='_blank'>Preamble</a>
  </td>
  <td>
  <a href='materials/eart60071_syllabus.pdf' target='_blank'>Syllabus and Assessment</a>
  </td>
  <td>
  <a href='materials/eart60071_list_of_symbols.pdf' target='_blank''>List of Symbols</a>
  </td>
  <!--<td>
  <a href='problems/eart10160_appendices.pdf' target='_blank''>Appendices</a>
  </td>
  </tr>
  <tr>
  <td>
  <a href='all_maths.pdf' target='_blank'>Foundation Maths Support Pack</a>
  </td>
  <td>
  <a href='PeriodicTable.pdf' target='_blank'>Periodic Table</a>
  </td>-->

  <td>
  <a href='https://video.manchester.ac.uk/lectures' target='_blank'>University Podcast service </a>
  </td>

  </tr>
</table>
<hr>";

echo $table1;
}
?>



<h2>Learning Module 1: Predictions using Ordinary Differential Equations </h2>

Tables will be populated with material each week.

<?php
if($_GET["ver"] == "2.0") {
$table2= "<table style='width:90%; font-size: 10pt' border='1'>
   <tr>
     <td>
     <b>Week&nbsp;1:</b>
     </td>
     <td>
     Tools of the trade
     </td>
     <td>
     Lecture material:
     <ul>
        <li>First, you must install and connect Global Protect VPN before you will be able to use SSH
            <ul>
            <li> Click <a href='https://www.itservices.manchester.ac.uk/ourservices/popular/vpn/' target='_blank'> here </a> and follow the instructions under \"Post Graduate Taught students\".</li>
            <li> You will need to be logged in for this to work. If you see a blank screen, go back and click on the link again after logging in..</li>
            </ul>
        </li>
       <li> <a href='https://youtu.be/lLhpDO4oY4I' target='_blank'>Set-up your system with Secure Shell Web App </a></li>
       <li> <a href='https://youtu.be/fjy8xKBYasM' target='_blank'>Week 1 asynchronous video </a></li>
       <li> <a href='materials/eart60071_lecture1_asynchronous.ppt' target='_blank'>Week 1 asynchronous slides </a></li>
       <li> <a href='materials/eart60071_lecture1_asynchronous.pdf' target='_blank'>Getting started </a></li>
       <li> <a href='materials/eart60071_lecture1_synchronous.pdf' target='_blank'>Synchronous activity in lecture 1 (to do together)</a></li>
     </ul>
     Practical material:<br>
     <ul>
       <li> <a href='https://youtu.be/rjxv3W0_opI' target='_blank'>Finite difference equations (FDEs, part 1) </a></li>
       <li> <a href='https://youtu.be/G6BQCvYvwWY' target='_blank'>FDEs (part 2) </a></li>
       <li> <a href='./practicals/material/tools_of_the_trade/Tools_of_the_Trade_Practical.pdf' target='_blank'>Synchronous activity in practical 1 </a></li>
       <!--<li> <a href='https://youtu.be/qOiyp_EXSrw' target='_blank'>Recorded Zoom on 2020-12-03</a></li>-->
     </ul>
     </td>
  </tr>

   <tr>
     <td>
     <b>Week&nbsp;2:</b>
     </td>
     <td>
     Box and Parcel Models in Environmental Science
     </td>
     <td>
     Lecture material:     
     <ul>
       <li> <a href='https://youtu.be/6c0TFjvM-Gg' target='_blank'>Week 2 asynchronous video </a></li>
       <li> <a href='materials/eart60071_lecture2_asynchronous.ppt' target='_blank'>Week 2 asynchronous slides </a></li>
       <li> <a href='materials/eart60071_lecture2_asynchronous.pdf' target='_blank'>Week 2 asynchronous notes </a></li>
       <li> <a href='https://www.youtube.com/watch?v=49UhDGhsvAg&list=PLJ_A_btyd69ujiy-cDiKyHGJ901o-EQZ8' target='_blank'>Videos of me working through questions </a></li>
       <!--<li> <a href='https://youtu.be/QJCAxyFaWIE' target='_blank'>Recorded Zoom on 2020-12-07</a></li>-->
     </ul>
     Practical material:
     <ul>
        <li> <a href='./practicals/material/parcel_modelling/Parcel_Modelling_Practical.pdf' target='_blank'>Synchronous activity in practical 2 </a></li>
        <!--<li> <a href='https://youtu.be/q5vRiEetL1I' target='_blank'>Recorded Zoom on 2020-12-10</a></li>-->
     </ul>     
  </tr>

  </table>";
  }
?>

<?php

if($_GET["ver"] == "2.0") {
    echo $table2;
}
?>


<h2>Learning Module 2: Predictions with Eulerian spatial coordinates </h2>
Tables will be populated with material each week.

<?php
if($_GET["ver"] == "2.0") {
$table3= "<table style='width:90%; font-size: 10pt' border='1'>


   <tr>
   <tr>
     <td>
     <b>Week&nbsp;3:</b>
     </td>
     <td>
     Transport and Mixing of Pollutants: Gaussian Plume Model
     </td>
     <td>

     Lecture material:     
     <ul>
       <li> <a href='https://youtu.be/OeBfFze1aGM' target='_blank'>Week 3 asynchronous video </a></li>
       <li> <a href='materials/eart60071_lecture3_asynchronous.ppt' target='_blank'>Week 3 asynchronous slides </a></li>
       <!--<li> <a href='https://youtu.be/KztpnxdP3ok' target='_blank'>Recorded Zoom on 2020-12-14</a></li>-->
     </ul>
     Practical material:
     <ul>
        <li> <a href='https://personalpages.manchester.ac.uk/staff/paul.connolly/teaching/eart60071/practicals/gaussian_plume_modelling.html' target='_blank'>Synchronous activity in practical 3 </a></li>
        <!--<li> <a href='https://youtu.be/IB7tH6iYTGI' target='_blank'>Recorded Zoom on 2020-12-17</a></li>-->
     </ul>   

    </td>
    
  </tr>



   <tr>
     <td>
     <b>Week&nbsp;4:</b>
     </td>
     <td>
     Single Column Modelling: Modelling Orographic Precipitation
     </td>
    <td>
     Lecture material:     
     <ul>
       <li> <a href='https://youtu.be/yQ7XusXFuO4' target='_blank'>Week 4 asynchronous video </a></li>
       <li> <a href='https://youtu.be/fgM1S_WcLFc' target='_blank'>Week 4 additional video about ice nucleation </a></li>
       <li> <a href='https://www.meted.ucar.edu/USBR/cloud_seeding/index.htm' target='_blank'>Background material on Cloud Seeding for those interested (MetEd)</a></li>
       <li> <a href='materials/eart60071_lecture4_asynchronous.pptx' target='_blank'>Week 4 asynchronous slides </a></li>
     </ul> 
     <br><br>
     Practical material:
     <ul>
        <li> <a href='https://personalpages.manchester.ac.uk/staff/paul.connolly/teaching/eart22001/practicals/orographic_precipitation.html' target='_blank'>Synchronous activity in practical 4 </a></li> 
     </ul>  

  </tr>


  </table>";
 }
?>

<?php

if($_GET["ver"] == "2.0") {
    echo $table3;
}
?>

<h2>Learning Module 3: Predictions with Dynamical Models&mdash;also Eulerian </h2>
Tables will be populated with material each week.

<?php
if($_GET["ver"] == "2.0") {
$table4= "<table style='width:90%; font-size: 10pt' border='1'>


   <tr>
     <td>
     <b>Week&nbsp;5:</b>
     </td>
     <td>
     Cartesian Shallow Water Model: Tsunamis and Large-Scale Waves 
     </td>
    <td>
     Lecture material:     
     <ul>
       <li> <a href='https://youtu.be/00_ZrVIQ5FA' target='_blank'>Week 5 asynchronous video </a></li>
       <li> <a href='materials/eart60071_lecture5_asynchronous.pdf' target='_blank'>Week 5 asynchronous notes </a></li>
       <li> <a href='materials/eart60071_lecture5_asynchronous.pptx' target='_blank'>Week 5 asynchronous slides </a></li>
       <li> <a href='https://www.youtube.com/watch?v=jYl-wN2gJew&list=PLJ_A_btyd69tZRvtD3oJFdTamqKarSofg' target='_blank'>Videos of me working through questions </a></li>
     </ul> 
     <br><br>
     Practical material:
     <ul>
        <li> <a href='./practicals/shallow_water_equations.html' target='_blank'>Synchronous activity in practical 5 </a></li>
        <!--<li> <a href='https://youtu.be/YRzSR5afpts' target='_blank'>Recorded Zoom on 2021-01-14</a></li>-->
     </ul>   
  </tr>




</table>";
}
?>

<?php

if($_GET["ver"] == "2.0") {
    echo $table4;
}
?>



<h2>Freely available atmospheric model data (for interest)</h2>
<table>
  <tr>
<td><div style="color:#555; font-size: 10px; display:block; padding-bottom:5px" >Global surface winds updated 3 hourly.</div>
<iframe style="display:inline" id="GLOBAL_winds1" width="480" height="270" name="main" title="Global winds1" 
        src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=2.90,53.88,1024"  frameborder="0" allowfullscreen> Global Winds</iframe> 
</td>
<td>
<div style="color:#555; font-size: 10px; display:block; padding-bottom:5px" >Global winds @500 hPa updated 3 hourly.</div>

<iframe style="display:inline" id="GLOBAL_winds2" width="480" height="270" name="main" title="Global winds2" 
    src="https://earth.nullschool.net/#current/wind/isobaric/500hPa/orthographic=2.90,53.88,1024"  frameborder="0" allowfullscreen> Global Winds</iframe> 
</td>
  </tr>
</table>


<br>

<table style="width:60%">
  <!--<tr>
    <td>
    <a href="http://data.cas.manchester.ac.uk/micc/micc.htm" target="_blank">Manchester Ice Cloud Chamber </a>
    </td>
    <td>
    Our cloud chamber for conducting research into cloud processes
    </td>
  </tr>-->

  <tr>
    <td>
    <a href="http://www.wetter3.de/" target="_blank">Wetter3 </a>
    </td>
    <td>
    site for GFS model and surface charts
    </td>
  </tr>

  <tr>
    <td>
    <a href="http://www.metoffice.gov.uk/" target="_blank">Met Office </a>
    </td>
    <td>
    again wealth of information on their newly-revamped site
    </td>
  </tr>

  <!--
  <tr>
    <td>
    <a href="http://www.metoffice.gov.uk/weather/uk/radar/" target="_blank">Met Office weather radar</a>
    </td>
  </tr>

  <tr>
    <td>
    <a href="http://www.metoffice.gov.uk/science/specialist/cwinde/profiler/index.html" target="_blank">European Wind Profiler Network</a>
    </td>
  </tr>
 -->
  <tr>
    <td>
    <a href="http://manunicast.seaes.manchester.ac.uk/" target="_blank">ManUniCast</a>
    </td>
    <td>
    our own model 
    </td>
  </tr>

  <tr>
    <td>
    <a href="http://www.cas.manchester.ac.uk/restools/whitworth/data/index.html" target="_blank">Whitworth Observatory</a>
    </td>
    <td>
    Our own observatory here in Manchester (OK not model data, but still interesting)
    </td>
  </tr>

    <!--
  <tr>
    <td>
    <a href="http://www.eumetrain.org/eport.html" target="_blank">EUMETRAIN</a>
    </td>
    <td>
    overlay met. fields on satellite images (via eport)
    </td>
  </tr>

  <tr>
    <td>
    <a href="http://www.sat24.com/en/eu" target="_blank">Satellite pictures</a>
    </td>
    <td>
    from SAT24.com
    </td>
  </tr>

  <tr>
    <td>
    <a href="http://weather.uwyo.edu/upperair/sounding.html" target="_blank">Skew-T radiosonde profiles</a>
    </td>
    <td>
    from the University of Wyoming
    </td>
  </tr>-->


</table>

<!--<object data="Addition_Lecture_1_CnWfronts_(open_in_your_Explorer).swf"></object> -->


<br>
<br>

            <p><img src="/staff/paul.connolly/common/bar.png" width=600
            height=22></p>

<footer>
            <table width="100%"><tr><td align="left">
            <i>Return to <a href="http://www.manchester.ac.uk/research/paul.connolly/">Paul's home page</a> |
            <a href="http://www.cas.manchester.ac.uk/">Centre for Atmospheric Science</a> | <a
            href="http://www.ees.manchester.ac.uk/">Department of Earth and Environmental Sciences</a>
            | <a href="http://www.manchester.ac.uk/">The University of
            Manchester</a></i></td><td align="right"><i>This page is
            maintained by <a
            href="mailto:p.connolly@manchester.ac.uk">Paul Connolly</a></i></td></tr></table>
		
</footer>


</body></html>
