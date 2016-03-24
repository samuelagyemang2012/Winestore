<?php
/**
 * Created by PhpStorm.
 * User: samuel
 * Date: 2/12/2016
 * Time: 11:28 PM
 */
require 'vendor/autoload.php';
Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('templates');
$twig = new Twig_Environment($loader);



