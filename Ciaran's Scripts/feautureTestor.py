import pandas as pd
import string

data = pd.read_csv(r"C:\Users\cbyle\Desktop\Files\Pishing-Detection\model_1.1\urls.csv", engine= 'python') 
f1 = data['URL']
f2 = data['Label']

bad = 0
good = 0

# Change these variables
numList = ['&']
minimum = 2

print("The minimum is: ", minimum)

for i in range(0,549346,1):
    if i %100000 == 0:
        print('At ', i)
    elif i == 549345:
        print("Done... Preparing results")
    
    count = 0
    for x in range (0,len(numList),1):
        count += f1[i].count(numList[x])

    if count >= minimum:
        if f2[i] == 'good':
            good += 1
        else:
            bad += 1

# print to console
print('Good = ', good, '\nBad = ', bad, '\nTotal = ', bad + good, '\nPercent Indication = ', good*100/(bad+good))

#print to file

#add to file
line = str(numList) + "\tMinimum: " + str(minimum) + "\tTotal Links: " + str(good+bad) + "\tGood Samples: " + str(good) + "\tBad Samples: " + str(bad) + "\tPercent Indication: " + str(int(good*10000/(good+bad))/100) + "\n"

fi = open("General\StringResults.txt", "a")
fi.write(line)
fi.close()