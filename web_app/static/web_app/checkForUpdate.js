// let value;
//
// $('.new-expense-input').on('keyup', function(){
//     let new_expense_input = $('.new-expense-input');
//     console.log(new_expense_input.val().toString().length)
//     if (new_expense_input.val().toString().length < 5){
//         value =  parseFloat(new_expense_input.val()) / 100;
//     }
//     else if(new_expense_input.val().toString().length === 5){
//         value = parseFloat(new_expense_input.val()) * 10;
//     }else if (new_expense_input.val().toString().length > 5){
//         value = parseFloat(new_expense_input.val()) * 10;
//     }
//     console.log(value);
//
//     // new_expense_input.val(parseFloat(value));
//
//     new_expense_input.val(value.toFixed(2))
// });

// let previousExpenseLength = 0;
//
// $('.new-expense-input').on('keyup', function(){
//     let new_expense_input = $('.new-expense-input');
//     let new_expense_input_string = new_expense_input.val().toString();
//     console.log(new_expense_input_string);
//     let len_of_string = new_expense_input_string.length;
//     let i;
//     let firstIndex = 0;
//     for (i = 0; i < len_of_string; i++){
//         if (new_expense_input_string[firstIndex] === "0"){
//             console.log("mathes")
//             console.log(new_expense_input_string);
//             new_expense_input_string = new_expense_input_string.substring(firstIndex);
//
//         }else if (new_expense_input_string[firstIndex] === "."){
//             console.log("matchees 2")
//             new_expense_input_string = new_expense_input_string.substring(firstIndex);
//             console.log("----", new_expense_input_string);
//             break;
//         }else{
//             firstIndex++;
//         }
//     }
//     let value;
//     console.log(new_expense_input_string);
//     if (new_expense_input_string.length === 1){
//         value = "0.0" + new_expense_input_string;
//     }else if(new_expense_input_string.length === 2){
//         value = "0." + new_expense_input_string;
//     }else{
//         console.log("****", new_expense_input_string)
//         value = [new_expense_input_string.slice(0, -2), ".", new_expense_input_string.slice(-2)].join('');
//         console.log(value)
//     }
//
//     new_expense_input.val(value);
// });

// $('.new-expense-input').on('keyup', function(){
//     let numNoDecimal = $('.new-expense-input').val().toString().replace('.', '');
//     let stringNoLeadingZeros = numNoDecimal;
//     for (let i=0; i < stringNoLeadingZeros.length; i){
//         if (stringNoLeadingZeros.charAt(i) == '0'){
//             stringNoLeadingZeros = stringNoLeadingZeros.substring(1);
//
//         }else{
//             break;
//         }
//     }
//
//     if (stringNoLeadingZeros.length == 1){
//         stringNoLeadingZeros = "0.0" + stringNoLeadingZeros;
//     }else if (stringNoLeadingZeros.length == 2){
//         stringNoLeadingZeros = "0." + stringNoLeadingZeros;
//     }else{
//         console.log(stringNoLeadingZeros.substring(0, stringNoLeadingZeros.length - 2));
//         stringNoLeadingZeros = stringNoLeadingZeros.substring(0, stringNoLeadingZeros.length - 2) + "." + stringNoLeadingZeros.substring(stringNoLeadingZeros.length - 2);
//
//     }
//     $('.new-expense-input').val(parseFloat(stringNoLeadingZeros));
// });

// $('.update-expense-input').on('keyup', function(){
//     let numNoDecimal = $('.update-expense-input').val().toString().replace('.', '');
//     let stringNoLeadingZeros = numNoDecimal;
//     for (let i=0; i < stringNoLeadingZeros.length; i){
//         if (stringNoLeadingZeros.charAt(i) == '0'){
//             stringNoLeadingZeros = stringNoLeadingZeros.substring(1);
//
//         }else{
//             break;
//         }
//     }
//
//     if (stringNoLeadingZeros.length == 1){
//         stringNoLeadingZeros = "0.0" + stringNoLeadingZeros;
//     }else if (stringNoLeadingZeros.length == 2){
//         stringNoLeadingZeros = "0." + stringNoLeadingZeros;
//     }else{
//         console.log(stringNoLeadingZeros.substring(0, stringNoLeadingZeros.length - 2));
//         stringNoLeadingZeros = stringNoLeadingZeros.substring(0, stringNoLeadingZeros.length - 2) + "." + stringNoLeadingZeros.substring(stringNoLeadingZeros.length - 2);
//
//     }
//     $('.update-expense-input').val(parseFloat(stringNoLeadingZeros));
// });