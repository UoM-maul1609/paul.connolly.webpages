% Script to run the model for with and without interactions between planets
[t,y,bodies]=solar_system02(1:10); % all planets interacting with each others gravity
[t1,y1,bodies1]=solar_system02(1); % all planets only interacting with the sun's gravity



