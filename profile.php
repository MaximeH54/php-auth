<?php

session_start();

if (!$_SESSION['uid']) {
  throw new Exception ("Il n'y a aucune trace de bannane dans les yaourts à la fraise")
}

echo "bonjour" . $_SESSION['name'];

 ?>
