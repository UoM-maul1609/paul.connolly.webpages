<!DOCTYPE html>
<html>
<head>
<title>Tutorial materials for report on dataset </title>
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
<h1>Tutorial materials for Writing a Report on Data</h1>

<!--<h2>Overview </h2>-->

<?php
if($_GET["ver"] == "2.0") {
$table1="<table style='width:90%'>

  <tr>

  <td>
  Final deadline for reports is 16th December. 1500 words max. 
  <a href='materials/mark_scheme.pdf' target='_blank'>Mark Scheme</a> 
  <!--<a href='materials/2021_Semester1_Unit_Plan_Env_Pathways_EART29200.pdf' target='_blank'>Syllabus and Assessment</a> -->
  </td>
    

  </tr>
</table>
<hr>";

echo $table1;
}
?>


<h2>Part 1: Analysis of data </h2>
Weeks 2-5 are dedicated to help with your analysis. Set out as follows:
<ul>
<li> In week two the tutor will introduce the dataset and problem.
<li> For week three you will plot out the data and bring to class, you will need to remove bad data and plot logarithm of each variable. Why?
<li> For week four you will perform a linear correlation and linear regression (and related hypothesis test). We will discuss the p-value in more detail. 
<li> For week five you will apply the regression equation to to the other dataset to make a prediction. Error analysis will also be considered. 
</ul>




<?php
if($_GET["ver"] == "2.0") {
$table3= "<table style='width:90%; font-size: 10pt' border='1'>


   <tr>
   <tr>
     <td>
     <b>Weeks&nbsp;2-5:</b>
     </td>
     <td>
     The data set and analysis techniques
     </td>
     <td>

     Lecture material:     
     <ul>
       <li><a href='materials/lecture.ppt' target='_blank'>Slides</a></li>
       <li><a href='../eart20170/practical07.pdf' target='_blank'>Practical PDF</a></li>

       <li>Data: <a href='../eart20170/material/datasets/mars/AustralianCirrusClouds.csv' target='_blank'>AustralianCirrusClouds.csv</a>, 
                 <a href='../eart20170/material/datasets/mars/martian_clouds.csv' target='_blank'>martian_clouds.csv</a></li>

      <li> Excel videos: <a href='http://youtu.be/099eMWhb3d0'>Calculate correlation cofficients and fit a line in Excel</a>; <a href='http://youtu.be/usPqUc7zSGg'>Fit a power law in Excel</a>; 
      <li> The analysis: <a href='https://youtu.be/yOPGm7E-iJ4'>Me talking through the analysis</a> 
     </ul>   

    </td>
    
  </tr>


  </table>";
 }
?>

<?php

if($_GET["ver"] == "2.0") {
    echo $table3;
}
?>




<h2>Part 2: Research Writing Toolkit</h2>

<!--Tables will be populated with material each week.-->

<?php
if($_GET["ver"] == "2.0") {
$table2= "<table style='width:90%; font-size: 10pt' border='1'>
   <!--<tr>
     <td>
     <b>Week&nbsp;7:</b>
     </td>
     <td>
     Discussion on searches and referencing
     </td>
     <td>
     Asynchronous activities:<br>
     <ul>
       <li> <a href='https://youtu.be/hW6b-7rVE0U' target='_blank'>Using a Reference Manager </a></li>
     </ul>

     <br>
     Synchronous activities<br>
     <ul>
       <li> <a href='materials/helping_hand.pdf' target='_blank'>Discussion about academic writing </a></li>
     </ul>
  </tr> -->

   <tr>
     <td>
     <b>Week&nbsp;7:</b>
     </td>

     <td>
     Abstracts. Before week 8 bring a plan of your write-up (bullet points are fine) to the tutorial.
     </td>
     <td>
     Material:
     <ul>
       <li> <a href='materials/eloquent_science_abstracts.pdf' target='_blank'>Writing Abstracts Advice </a></li>
       <li> <a href='materials/abstracts_for_students_2021.pdf' target='_blank'>Example abstracts </a></li>
     </ul>
  </tr>

   <tr>
     <td>
     <b>Week&nbsp;8:</b>
     </td>

     <td>
     Discussion of types data plots
     </td>
     <td>
     Material:
     <ul>
       <li> See Eloquent science. </li>
     </ul>
  </tr>
  
   <tr>
     <td>
     <b>Week&nbsp;10:</b>
     </td>

     <td>
     Draft report on which feedback will be given.
     </td>
     <td>
     Material:
     <ul>
       <li> N/A </li>
     </ul>
     Next week plan submitted to Blackboard:
     <ul>
        <li> Title
        <li> Abstract
        <li> Intro
        <li> Data analysis
            <ul>
                <li> Plot
                <li> Regression
                <li> Correlation
                <li> significance / p-value
            </ul>
        <li> Conclusion
     </ul>
  </tr>
  
   <tr>
     <td>
     <b>Week&nbsp;12:</b>
     </td>

     <td>
     Report due.
     </td>
     <td>
     Material:
     <ul>
       <li> N/A </li>
     </ul>
  </tr>
  
  
  

   <!--<tr>
     <td>
     <b>Week&nbsp;10:</b>
     </td>

     <td>
     Datasets (and models)
     </td>
     <td>
     Material:
     <ul>
       <li> <a href='materials/ChlaData.csv' target='_blank'>Dataset </a></li>
       <li> <a href='materials/plotting_python.py' target='_blank'>Python script </a></li>
       <li> <a href='materials/reference.txt' target='_blank'>Reference </a></li>
     </ul>
  </tr>

   <tr>
     <td>
     <b>Week&nbsp;8:</b>
     </td>

     <td>
     We discussed our data plots and introduced a dataset that will be used in your report.
     </td>
     <td>
     Material:
     <ul>
       <li> N/A</li>
     </ul>
  </tr>-->

  <!-- <tr>
     <td>
     <b>Week&nbsp;2:</b>
     </td>
     <td>
     What should be in a Research Proposal?
     </td>
     <td>
     Asynchronous material:
     <ul>
       <li> <a href='https://youtu.be/e6B2Lli_8_Y' target='_blank'>Week 2 asynchronous video </a></li>
       <li> <a href='materials/eart29200_tutorial2_asynchronous.ppt' target='_blank'>Week 2 asynchronous slides </a></li>
       <li> <a href='materials/chapter07_trft.pdf' target='_blank'>Reading prior to tutorial</a></li>
     </ul>
     Prepare for the tutorial by studying the <b>asynchronous</b> material. We will do <b>synchronous</b> activities to reinforce your learning.<br>
     <ul>
       <li> Activity will be a break-out room discussion about the different sections of a 'toy' research proposal.</li>
     </ul>
  </tr>


   <tr>
     <td>
     <b>Week&nbsp;3:</b>
     </td>
     <td>
     How to Convince Decision-Makers
     </td>
     <td>
     Asynchronous material:
     <ul>
       <li> <a href='https://youtu.be/A1C2bMyCKYk' target='_blank'>Week 3 asynchronous video </a></li>
       <li> <a href='materials/eart29200_tutorial3_asynchronous.ppt' target='_blank'>Week 3 asynchronous slides </a></li>
       <li> <a href='materials/chapter09_trft.pdf' target='_blank'>Reading prior to tutorial</a></li>
     </ul>
     Prepare for the tutorial by studying the <b>asynchronous</b> material. We will do <b>synchronous</b> activities to reinforce your learning.<br>
     <ul>
       <li> Activity will be a break-out room discussion of tools 13 and 14 in the chapter. Ideas will be discussed in the tutorial.</li>
     </ul>
  </tr>

   <tr>
     <td>
     <b>Week&nbsp;4:</b>
     </td>
     <td>
     Useful tips for Language and Style
     </td>
     <td>
     Asynchronous material:
     <ul>
       <li> <a href='https://youtu.be/e2kZeISVTDc' target='_blank'>Week 4 asynchronous video </a></li>
       <li> <a href='materials/eart29200_tutorial4_asynchronous.ppt' target='_blank'>Week 4 asynchronous slides </a></li>
       <li> <a href='materials/chapter10_trft.pdf' target='_blank'>Reading prior to tutorial</a></li>
     </ul>
     Prepare for the tutorial by studying the <b>asynchronous</b> material. We will do <b>synchronous</b> activities to reinforce your learning.<br>
     Activity will be a break-out room discussion of how you can use
       <ul>
            <li> assert-justify; 
            <li> labelling using tag phrases; 
            <li> where you can use linking; 
            <li> where signposts are best used; 
            <li> where you can use priming..
        </ul>
        
        <ul>
     </ul>
  </tr>

   <tr>
     <td>
     <b>Weeks&nbsp;5:</b>
     </td>
     <td>
     Time saving tip: Using a Reference Manager. 
     </td>
     <td>
     Asynchronous activities:<br>
     <ul>
       <li> <a href='https://youtu.be/hW6b-7rVE0U' target='_blank'>Using a Reference Manager </a></li>
       <li> Placeholder: Template.</li>
     </ul>

     <br>
     Synchronous session is discussion of tool 13.
  </tr>-->




  </table>";
  }
?>

<?php

if($_GET["ver"] == "2.0") {
    echo $table2;
}
?>



    
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
