<?php

class config{
  private $informations = [
    "db_ip" => "0.0.0.0", //colocar "mysql" de volta dps
    "db_port" => "3306",
    "db_user" => "n3rdydev",
    "db_pass" => "N3rdygamerbr@123",
    "db_name" => "tccapi",
    "imagesApiKey" => "e904bc960e7c33800f6de0c7cd9d1fbf1cbfa94a20459551c20a45c6ba52e830"
  ];

  function get(){
    return $this->informations;
  }
}
