
# read the data as lines in list format
with open("ChlaData.csv","r") as file:
    data = file.readlines()
    
# create arrays to plot
import numpy as np

len1=len(data)-1
lat = np.zeros((len1))
lon = np.zeros((len1))
ChlValues = np.zeros((len1))
pH =  np.zeros((len1))
year =  np.zeros((len1))

for i in range(len1):

    try:
        line1=data[i+1].split(',')
    
        # save data
        lat[i]          = float(line1[5])
        lon[i]          = float(line1[6])
        ChlValues[i]    = float(line1[8])
        if line1[18].replace('\n','') == '':
            pH[i] = -999
        else:
            pH[i]           = float(line1[18].replace('\n','') )
    except:
        pass        
#     year[i]         = float(line1[3])




import matplotlib.pyplot as plt

plt.ion()
from mpl_toolkits.basemap import Basemap
import matplotlib.pyplot as plt

map = Basemap()

map.drawcoastlines()
map.drawmeridians(range(0, 360, 20))
map.drawparallels(range(-90, 100, 10), linewidth=1, dashes=[4, 2], labels=[1,0,0,1], color='r', zorder=0 )
plt.show()

plt.scatter(lon,lat,c=np.log(ChlValues))
cb=map.colorbar(location='bottom')
cb.set_ticks(np.linspace(-9,1,11))  
cb.set_ticklabels(10**cb.get_ticks())   
cb.set_label('Chlorophyl (mg m$^{-3}$)') 
plt.show()

plt.savefig('myfig.png')