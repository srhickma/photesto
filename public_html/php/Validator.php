<?php
error_reporting(0);

class Validator {
    
    static function validateFPath($input){
        for($i = 0; $i < strlen($input); $i ++){
            if($input{$i} == '.'){
                $input{$i} = 'a';
                break;
            }
        }
        if(!preg_match('/[^A-Za-z0-9]/', $input) && strlen($input) > 0){
            return true;
        }
        else{
            return false;
        }
    }
    
    static function validateInt($input){
        for($i = 0; $i < strlen($input); $i ++){
            if($input{$i} == '-'){
                $input{$i} = '0';
                break;
            }
        }
        if(ctype_digit($input) && strlen($input) > 0){
            return true;
        }
        else{
            return false;
        }
    }
    
    static function validateEmail($input){
        for($i = 0; $i < strlen($input); $i ++){
            if($input{$i} == '.' || $input{$i} == '@' || $input{$i} == '!' || $input{$i} == '#' || $input{$i} == '$' || $input{$i} == '%' || $input{$i} == '&' || $input{$i} == '*' || $input{$i} == '+' || $input{$i} == '-' || $input{$i} == '/' || $input{$i} == '=' || $input{$i} == '?' || $input{$i} == '^' || $input{$i} == '_' || $input{$i} == '{' || $input{$i} == '|' || $input{$i} == '}' || $input{$i} == '~'){
                $input{$i} = 'a';
            }
        }
        if(!preg_match('/[^A-Za-z0-9]/', $input) && strlen($input) > 0){
            return true;
        }
        else{
            return false;
        }
    }
    
    static function validateSpaces($input){
        for($i = 0; $i < strlen($input); $i ++){
            if($input{$i} == ' '){
                $input{$i} = 'a';
            }
        }
        if(!preg_match('/[^A-Za-z0-9]/', $input) && strlen($input) > 0){
            return true;
        }
        else{
            return false;
        }
    }

    static function validateSpacesAND($input){
        for($i = 0; $i < strlen($input); $i ++){
            if($input{$i} == ' ' || $input{$i} == '&'){
                $input{$i} = 'a';
            }
        }
        if(!preg_match('/[^A-Za-z0-9]/', $input) && strlen($input) > 0){
            return true;
        }
        else{
            return false;
        }
    }
    
}
