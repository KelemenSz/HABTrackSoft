"""Simple script for creating test trajectories for the tracking webpage."""
import time

import numpy as np


la0 = 4.678890563986873019e+01
lo0 = 2.359874456646698704e+01

la1 = 4.678890563986873019e+01
lo1 = 2.359874456646698704e+01

for i in range(10000):

    with open("./traiectories/object10.txt", "a") as f:
        la0 += (np.random.random()-0.5) * 10 ** (-2)
        lo0 += (np.random.random()-0.3) * 10 ** (-2)
        if i == 0:
            f.write(f"{la0} {lo0}")
        else:
            f.write(f"\n{la0} {lo0}")
        time.sleep(0.3)

    with open("./traiectories/object11.txt", "a") as f2:
        la1 += (np.random.random()-0.5) * 10 ** (-2)
        lo1 += (np.random.random()-0.3) * 10 ** (-2)
        if i == 0:
            f2.write(f"{la1} {lo1}")
        else:
            f2.write(f"\n{la1} {lo1}")
        time.sleep(0.3)
