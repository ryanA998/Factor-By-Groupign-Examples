
//Factor By Grouping Examples 
//Author:   Ryan Arendt
//Version:  Final
//Last Edited: 10/7/2020

//This application was more like an experiment to what could be done in JavaScript. The code bellow
//creates the entire structure of the webpage. This is unconventional and may not nessisarily be 
//the best approach but it gave the the opprotunity to learn more Javascript and may serve as
//a stepping stone to more robust Factor by Grouping web applications in the future. I wanted to
//see how customizable I could make the generation of the solutions. 



document.body.onload = main();

function main(){
    let pb_1_coef = [1, 4, 2, 3];
    let pb_2_coef = [3, 1, 1, 2]; 
    let pb_3_coef = [1, 3, 1, 2];
    let pb_4_coef = [2, -3, 1, 2];
    let pb_5_coef = [8, 1, 2, 3];

    gen_problem('1', pb_1_coef);
    gen_problem('2', pb_2_coef);
    gen_problem('3', pb_3_coef);
    gen_problem('4', pb_4_coef);
    gen_problem('5', pb_5_coef);

}


function gen_problem(n, pb_coef){

    let pb_steps = sol_steps(pb_coef);

    add_prob_statement("pb_"+n,"pb_"+n+"_statement",n+".)  "+pb_steps[0]);
    let btn_box = add_div("btn_"+n+"_box", "button_box");

    let pb = "'pb_"+n+"'";

    let ans_func = "btn_answer("+pb+")";
    let sol_func = "btn_steps("+pb+")";

    add_button("pb_"+n, btn_box,"ans_"+n,"Answer", ans_func);
    add_button("pb_"+n, btn_box, "steps_"+n, "Steps", sol_func);
    add_answer("pb_"+n, "pb_"+n+"_ans", pb_steps);
    add_solution("pb_"+n, "pb_"+n+"_sol", pb_steps);
}


function add_prob_statement(problem_div, statement_div, pb_html){

    let cur_div = document.getElementById("problems");
    
    let problem_1 = add_div(problem_div, "problem_box");
    cur_div.appendChild(problem_1);
    
    let pb_1_statment = add_div(statement_div, "problem_statement");
    problem_1.appendChild(pb_1_statment);

    pb_1_statment.innerHTML = pb_html;

}

function add_answer(problem_div, answer_div, steps){

    let answer_box = add_div(answer_div, "answer_box");
    document.getElementById(problem_div).appendChild(answer_box);

    let answer_text = add_div(answer_div+"_text", "answer_text");
    document.getElementById(answer_div).appendChild(answer_text);
    answer_text.innerHTML = "Answer:";

    let answer_steps = add_div(answer_div+"_steps", "answer_steps");
    document.getElementById(answer_div).style.visibility = 'hidden';
    document.getElementById(answer_div).appendChild(answer_steps);
    
    answer_steps.innerHTML = steps[steps.length-1];
}


function add_button(problem_div, button_box, button_div, button_text, button_function){

    let pb_button = document.createElement('button');
    pb_button.setAttribute('id', button_div);
    pb_button.setAttribute('class', 'pb_button');
    pb_button.setAttribute('onclick', button_function);

    pb_button.innerHTML = button_text;

    button_box.appendChild(pb_button);
    document.getElementById(problem_div).appendChild(button_box);

}

function btn_answer(pb_id){

    let sol_box_height = '290px';
    let ans_box_height = '95px';

    document.getElementById(pb_id+"_ans").style.visibility = 'visible';
    if(document.getElementById(pb_id).style.height != sol_box_height){
        document.getElementById(pb_id).style.height = ans_box_height;
        document.getElementById(pb_id+"_ans_text").style.visibility = 'visible';
        document.getElementById(pb_id+"_ans_steps").style.visibility = 'visible';
    }
    else{
        document.getElementById(pb_id+"_ans_text").style.visibility = 'visible';
        document.getElementById(pb_id+"_ans_steps").style.visibility = 'visible';
    }  
}

function btn_steps(pb_id){

    let sol_box_height = '290px';
    document.getElementById(pb_id+"_sol").style.visibility = 'visible';
    document.getElementById(pb_id).style.height = sol_box_height;
    document.getElementById(pb_id+"_sol_text").style.visibility = "visible"
    document.getElementById(pb_id+"_sol_steps").style.visibility = "visible"
}


function add_solution(problem_div, sol_div, pb_steps){

    let sol_box = add_div(sol_div, "solution_box");
    document.getElementById(problem_div).appendChild(sol_box);

    let sol_text = add_div(sol_div+"_text", "solution_text");
    document.getElementById(sol_div).appendChild(sol_text);
    sol_text.innerHTML = "Solution:";

    let sol_steps = add_div(sol_div+"_steps", "solution_steps");
    document.getElementById(sol_div).appendChild(sol_steps);

    document.getElementById(sol_div).style.visibility = "hidden";

    for(let i=0; i<pb_steps.length; i++){
        //Create a new div. Make it the child of the solution steps class
        let indv_step = add_div("Step "+(i+1).toString(), "indv_solution_step")
        document.getElementById(sol_div+"_steps").appendChild(indv_step);

        indv_step.innerHTML += pb_steps[i] +"\n";
    }
}


function add_div(div_id, class_id){
    let new_div = document.createElement('div');
    new_div.setAttribute('id', div_id);
    new_div.setAttribute("class", class_id);

    return new_div;

}


function sol_steps(ceof_list)
{
    let ac = ceof_list[0]*ceof_list[2].toString();
    let ad = ceof_list[0]*ceof_list[3].toString();
    let bc = ceof_list[1]*ceof_list[2].toString();
    let bd = ceof_list[1]*ceof_list[3].toString();
    let ad_bc = ceof_list[0]*ceof_list[3]+ceof_list[1]*ceof_list[2].toString();

    let a = ceof_list[0].toString();
    let b = ceof_list[1].toString();
    let c = ceof_list[2].toString();
    let d = ceof_list[3].toString();

    let step_01 = ac+"x<sup>2</sup>+"+ad_bc+"x+"+bd; 
    let step_02 = ac+"x<sup>2</sup>+"+ad+"x+"+bc+"x+"+bd;
    let step_03 = "("+ac+"x<sup>2</sup>+"+ad+"x)+("+bc+"x+"+bd+")";
    let step_04 = a+"x"+"("+c+"x+"+d+")+"+b+"("+c+"x+"+d+")";
    let step_05 = "("+a+"x+"+b+")"+"("+c+"x+"+d+")";

    let steps = [step_01,step_02,step_03,step_04,step_05];
    return steps;
}   

