<?php

class MyController {

    private $conn;

    public function __construct()
    {
        $host = "localhost";
        $dbname = "id15570213_test";
        $user = "id15570213_olyatkachiv";
        $pass = 's$4CH?G_uE@Q<ok_';
        $dsn = "mysql:host=$host;dbname=$dbname";
        try {
        $this->conn = new PDO($dsn, $user, $pass);
        }
        catch (PDOException $e) {
            print "Error!: ". $e->getMessage() . "<br/>";
            die();
        }
    }

    public function makeAction($action) {
    switch ($action) {
        case 'show_all':
            $this->getAll();
            break;
        case 'add':
            $this->add($_POST['params']);
            break;
        case 'edit':
            $this->edit($_POST['params']);
            break;
        case 'delete':
            $this->delete($_POST['params']['id']);
            break;
        default:
            $this->setStatus($_POST['params']['status'],$_POST['params']['id']);
            break;
    }
}
    private function exec($sql, $params = null) {
        $statement = $this->conn->prepare($sql);
        $params == null ? $statement->execute() : $statement->execute($params);
        $response = $statement->fetchAll(PDO::FETCH_ASSOC);
        if(!empty($response)) {
            $result = json_encode($response);
            echo $result;
        } else {
            if (!strpos($sql,'SELECT') !== false) {
                $this->getAll();
            } else { echo "Table is empty.";  }
        }
    }

    private function getAll() {
        $this->exec("SELECT * FROM users");
    }

    private function add($params){
        $sql = "INSERT INTO users (name,surname,status,role) VALUES (?,?,?,?)";
        $status = isset($params['status']) ? 1 : 0;
        $values = array($params['name'],$params['surname'],$status,$params['setRole']);
        $this->exec($sql,$values);
    }

    private function edit($params){
        $sql = "UPDATE users SET name=?,surname=?,status=?,role=? WHERE id=?";
        $status = isset($params['status']) ? 1 : 0;
        $values = array($params['name'],$params['surname'],$status,$params['setRole'],$params['id']);
        $this->exec($sql,$values);
    }

    private function delete($id){
        if(is_array($id)) {
            $ids = str_repeat("?,", count($id)-1) . "?";
        } else {
            $ids = "?";
            $id = array($id);
        }
        $sql = "DELETE FROM users WHERE id IN ($ids)";
        $this->exec($sql,$id);
    }

    private function setStatus(string $status, $id)
    {
        $status = array((int)$status);
        $ids = str_repeat("?,", count($id) - 1) . "?";
        $sql = "UPDATE users SET status=? WHERE id IN ($ids)";
        $values = array_merge($status,$id);
        $this->exec($sql,$values);
    }
}

$action = isset($_POST['params']['action']) ? $_POST['params']['action'] : 'show_all';
//unset($_POST['params']['action']);
$myObject = new MyController();
$myObject->makeAction($action);
