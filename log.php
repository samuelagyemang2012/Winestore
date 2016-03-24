<?php
/**
 * Created by PhpStorm.
 * User: samuel
 * Date: 2/12/2016
 * Time: 7:47 PM
 */

include_once 'render_config.php';

echo $twig->render('sign-in.twig', array('var' => 'Fabien'));

//
//session_destroy();
