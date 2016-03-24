<?php

include_once("Adb.php");

//include_once ("login.php");
//include_once ("mArchive.php");
//>>>>>>> refs/remotes/origin/archive_login

/**
 * Class User
 */
class User extends Adb
{


    /**
     * @param $username
     * @param $password
     * @return bool
     */
    public function login($username, $password)
    {
        $string = "select * from users where user_name= ? and password= ?";
        $s = $this->prepare($string);
        $s->bind_param('ss', $username, $password);
        $s->execute();

        return $s->get_result();
    }


    /**
     * @param $name
     * @param $type
     * @param $winery
     * @param $year
     * @param $cost
     * @param $id
     * @return bool
     */
    function update($name, $type, $winery, $year, $cost, $id)
    {

        $s1 = "update wine set wine_name = '$name', wine.wine_type='$type',winery_id='$winery',year='$year' WHERE wine_id = '$id'";

        $s2 = "update inventory set cost = '$cost' where wine_id = '$id'";

        $this->query($s1);
        $this->query($s2);

        return true;
    }

    /**
     * @param $id
     * @param $wine_name
     * @param $wine_type
     * @param $winery_name
     * @param $year
     * @return bool
     */
    function add($id, $name, $type, $year, $winery, $cost, $qty)
    {

        $string1 = "INSERT INTO `wine`(`wine_id`, `wine_name`, `wine_type`, `year`, `winery_id`) VALUES('$id','$name','$type','$year','$winery')";

        $string2 = "INSERT INTO `inventory`(`wine_id`, `inventory_id`, `on_hand`, `cost`) VALUES ('$id',1,'$qty','$cost')";

        $this->query($string1);

        $this->query($string2);

        return true;
    }

    /**
     * @return bool|mysqli_result
     */
    function allWineries()
    {
        $string = "select winery_name from winery";

        return $this->query($string);
    }

    function allTypes()
    {
        $string = "select wine_type from wine_type";

        return $this->query($string);
    }

    /**
     * @param $name
     * @return bool|mysqli_result
     */
    function forWinery($name)
    {
        $string = "select winery_id from winery where winery_name = ?";

        $s = $this->prepare($string);
        $s->bind_param('s', $name);
        $s->execute();

        return $s->get_result();
    }

    /**
     * @param $type
     * @return bool|mysqli_result
     */
    function forType($type)
    {
        $string = "select wine_type . wine_type_id from wine_type where wine_type . wine_type = ?";

        $s = $this->prepare($string);
        $s->bind_param('s', $type);
        $s->execute();

        return $s->get_result();
    }

    function countWines()
    {
        $string = "SELECT distinct w.wine_id FROM wine w
                   INNER JOIN wine_type t
                   ON w.wine_type = t.wine_type_id
                   INNER JOIN winery n
                   ON w.winery_id = n.winery_id
                   INNER JOIN inventory i
                   ON w.wine_id = i.wine_id";


        $r = $this->query($string);

        $num = mysqli_num_rows($r);

//        $num = $r->num_rows();

        return $num;
    }
}
