<?php
error_reporting(0);

class QuickSort {
  static function sort($arr){
    if(count($arr) <= 1)return $arr;
    $pivot = count($arr) - 1;
    $lower = array();
    $greater = array();
    for($i = 0; $i < $pivot; $i ++){
      if($arr[$i]->num > $arr[$pivot]->num){
        $greater[] = $arr[$i];
      }
      else{
        $lower[] = $arr[$i];
      }
    }
    $a = array();
    $lower = QuickSort::sort($lower);
    $greater = QuickSort::sort($greater);
    for($i = 0; $i < count($lower); $i ++){
      $a[] = $lower[$i];

    }
    $a[] = $arr[$pivot];
    for($i = 0; $i < count($greater); $i ++){
      $a[] = $greater[$i];

    }
    return $a;
  }
}
