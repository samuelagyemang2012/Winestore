<?php
/**
 * Created by PhpStorm.
 * User: samuel
 * Date: 2/12/2016
 * Time: 7:47 PM
 */
include_once 'Wine.php';
include_once 'Admin.php';
include_once 'render_config.php';
//include_once 'Cart.php';

session_start();

//$allCart['carts'] = null;
//$allQty['qtys'] = null;
//$fetchedCart = null;
//$wasfound = false;
$wine = new Wine();
$i = 0;
//$qty[] = null;
$wid = null;
$total = 0;

if (isset($_GET['wine_id'])) {

    $wid = $_GET['wine_id'];

    if (!isset($_SESSION['cart'][$wid])) {

        $cc = $wine->getDetails($wid);
        $addItem = $cc->fetch_array(MYSQLI_ASSOC);

        $_SESSION['cart'][$wid] = [
            'item' => $addItem['wine_id'],
            'wine_name' => $addItem['wine_name'],
            'wine_type' => $addItem['wine_type'],
            'quantity' => 1,
            'cost' => $addItem['cost'],
            'total' => $addItem['cost']
        ];
    }
}

if (isset($_GET['id']) && isset($_GET['action'])) {

    if (isset($_GET['action'])) {
        $someAction = $_GET['action'];
        $id = $_GET['id'];

        switch ($someAction) {

            case 'add':
                $_SESSION['cart'][$id]['quantity']++;
                $cc = $wine->getDetails($id);
                $addItem = $cc->fetch_array(MYSQLI_ASSOC);

                $_SESSION['cart'][$id] = [
                    'item' => $addItem['wine_id'],
                    'wine_name' => $addItem['wine_name'],
                    'wine_type' => $addItem['wine_type'],
                    'quantity' => $_SESSION['cart'][$id]['quantity'],
                    'cost' => $addItem['cost'],
                    'total' => $addItem['cost'] * $_SESSION['cart'][$id]['quantity']
                ];
//                echo "end at break";
                break;

            case 'subtract':
                $_SESSION['cart'][$id]['quantity']--;
                $cc = $wine->getDetails($id);
                $addItem = $cc->fetch_array(MYSQLI_ASSOC);

                $_SESSION['cart'][$id] = [
                    'item' => $addItem['wine_id'],
                    'wine_name' => $addItem['wine_name'],
                    'wine_type' => $addItem['wine_type'],
                    'quantity' => $_SESSION['cart'][$id]['quantity'],
                    'cost' => $addItem['cost'],
                    'total' => $addItem['cost'] * $_SESSION['cart'][$id]['quantity']
                ];

                if($_SESSION['cart'][$id]['quantity']<= 0){
                    unset($_SESSION['cart'][$id]);
                }
                break;

            case 'clear':
                unset($_SESSION['cart']);
                break;

            case 'remove':
                unset($_SESSION['cart'][$id]);
                break;
        }
    }
}

if (isset($_SESSION['cart']) && count($_SESSION['cart']) > 0) {

    foreach ($_SESSION['cart'] as $wine_id => $details) {
        $total += $_SESSION['cart'][$wine_id]['total'];
    }
}

$numPerPage = 20;

if (isset($_REQUEST['page'])) {
    $page = $_REQUEST['page'];
} else {
    $page = 1;
}

$start_from = ($page - 1) * $numPerPage;

$wine = new Wine();
$admin = new User();

if ($all = $wine->getAllWines($start_from, $numPerPage)) {
    $totalNumRows = $admin->countWines();
    $total_wines = $totalNumRows['wine_id'];

    $total_pages = ceil($totalNumRows / $numPerPage);

    $ar = $all->fetch_all(MYSQLI_ASSOC);
    $i = 0;

    $allData['wines'] = $ar;

    /** @var array $data */
    echo $twig->render('tables.twig', [
        'wines' => $ar,
        'total_wines' => $total_wines,
        'page' => $page,
        'totalPages' => $total_pages,
        'carts' => isset($_SESSION['cart']) ? $_SESSION['cart'] : '',
        'total' => $total
    ]);
}

//print_r($_SESSION['cart']);
//unset($_SESSION['cart']);
//session_destroy();
