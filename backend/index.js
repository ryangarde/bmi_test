require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())

app.use(express.json())

app.post('/get-bmi', (req, res) => {
  let bmi = 0;

  function getBMICategory() {
    if(bmi < 18.5) {
      return 'Underweight'
    } else if(bmi >= 18.5 && bmi < 25) {
      return 'Normal'
    } else if(bmi >= 25 && bmi < 30) {
      return 'Overweight'
    } else if(bmi >= 30) {
      return 'Obese'
    } else {
      return 'Invalid BMI'
    }
  }

  if(req.body.unitType == 'english') {
    let inches = 0;
    inches = (req.body.feet * 12) + +req.body.inches;
    bmi = (req.body.pounds / (inches * inches)) * 703;
  } else if(req.body.unitType == 'metric') {
    const height = req.body.centimeters / 100;
    bmi = req.body.kilograms / (height * height);
  } else {
    res.status(400).send('Invalid unit type');
  }

  res.send({
    bmi: bmi.toFixed(1),
    category: getBMICategory(bmi)
  })
})

app.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`)
})