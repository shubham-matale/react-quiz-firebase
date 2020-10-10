import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Radio,RadioGroup, FormControl,CardContent,FormLabel,FormControlLabel, Grid } from '@material-ui/core';

export default function QuestionCard(props) {
    const [value, setValue] = React.useState('optionA');

    const handleChangeRadio = (event) => {
        setValue(event.target.value);
        let currentQuizData = selectedQuiz;
        // currentQuizData['questions'][props.currentIndex]['userAns']=event.target.value;
        // localStorage.setItem('selectedQuizForPlay',JSON.stringify(currentQuizData))
    };
    const [selectedQuiz, setSelectedQuiz]=useState({});
    
    return (
        <Grid md={12}>
            <Card>
                <CardHeader
                    title={props.data.question}
                    subtitle="Please Choose One option"
                />
                <CardContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Options</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangeRadio}>
                            <FormControlLabel value="optionA" control={<Radio />} label={props.data.optionA} />
                            <FormControlLabel value="optionB" control={<Radio />} label={props.data.optionB} />
                            <FormControlLabel value="optionC" control={<Radio />} label={props.data.optionC}/>
                            <FormControlLabel value="optionD" control={<Radio />} label={props.data.optionD} />
                        </RadioGroup>
                    </FormControl>
                </CardContent>

            </Card>
            </Grid>
    )

}