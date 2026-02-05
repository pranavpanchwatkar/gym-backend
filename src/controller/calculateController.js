export const calculate = (req, res) => {
    const { weight, height, age, gender } = req.body;

    let heightInCm;
    if (height < 10) {
        heightInCm = height * 100;
    } else {
        heightInCm = height;
    }

    // BMI  
    const heightInMeters = heightInCm / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    // BMI Category
    let bmiCategory;
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal weight';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';

    // BMR 
    let bmr;
    if (gender === 'Male') {
        bmr = (10 * weight + 6.25 * heightInCm - 5 * age + 5).toFixed(2);
    } else {
        bmr = (10 * weight + 6.25 * heightInCm - 5 * age - 161).toFixed(2);
    }

    res.json({
        bmi: parseFloat(bmi),
        bmiCategory,
        bmr: parseFloat(bmr),
        message: 'calculated successfully'
    });
}