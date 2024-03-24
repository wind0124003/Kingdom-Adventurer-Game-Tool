# Basic Configuration on the application
- `diamond-book`: a select input, which refers to **the amount of diamond book**. `range`: 0 - 5
- `awakening-book`: a select input, which refers to **the amount of awakening book**. `range`: 0 - 5
- `target`: a number input, which means awakening target for parents. `min`= 0, `max` depends on **how many awakening book have**
- `current-awakening`: a number input, which means how many awakening parents have currently. 100 points = 1 awakening. `min`=0, `max` depends on `target`, it could be **smaller than or equal to `target`**

- `current-point-awakening`: a number input, which means **how many points awakening** parents have currently. This is expressed as a progress bar in the game, and fulfill 100 points as 1 awakening.
`min`=0, `max`=95, `step` could be 5, because the minimum exp units, scholar, gives 5 points of awakening.

- `reset`: a button, which **resets** the form
- `result-display`: a span tag, which means **how many D units needed** for parents
- `total-Diamond`: a span tag, which means **how many diamonds** need to buy D units for awakening
- `max-awakening`: a span tag, which refers to max awakening that a resident


# Basic Function
## 1. Calculate button
The webpage should show the result properly after clicking the button.

First, it calculate below items, D units need and total diamond need.
- D units need: 
    > (`target` * 100 - (`current-awakening` * 100 + `current-point-awakening`)) / 30
- total diamond need: 
    > let *x* be the amount of needed D units for parent1,<br> 
    > *y* be the amount of needed D units for parent2, <br>
    > *n* be the amount of diamond-book <br>
    > formula = `(x + y) * 100 *(1 - n * 0.02)`

Then, the calculated result should display in `p1-result-display`, `p2-result-display`, `total-diamond`.

## 2. update the max limit of target awakening
After changing the value of `awakening-book`, the `max` of `target` should be updated.
Also, the `max-awakening` should be updated, equals to `max` of `target`

## 3. update the max value of current awakening
After changing the value of target, the `max` of `current-awakening` should be updated, which equal to `target`.

## 4. Reset button
After clicking this button, reset all data on each input (select, number) and span

## 5. Alert
If submitted data unmatches the rules and clicking submit button, a alert message will prompt to remind user to change input.

## Additional Feature
### update span
1. After clicking "calculate" button, this span will appear, means the result is latest.
2. Then, changing the input of the form, this span will be **hidden**, to remind the user to click "calculate" button and get the latest result.




