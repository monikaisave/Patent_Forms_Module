<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<script>
  try {
    var app = angular.module('myApp', []);
    app.controller('patentFormsCtrl', function($scope){});
  } catch(e) {}
</script>
<div class="content-wrapper" id="myApp" ng-controller="patentFormsCtrl" style="height: calc(100vh - 50px); background: #ffffff; padding: 0; overflow: hidden;">
  <?php
    $initialFile = !empty($activeFileNo) ? $activeFileNo : '';
    $initialMode = !empty($viewMode) ? $viewMode : 'list';
    $iframeSrc = '/assets/form_builder/index.html?fileNo=' . urlencode($initialFile) . '&mode=' . urlencode($initialMode);
  ?>
  <iframe 
    id="builderIframe"
    style="width: 100%; height: 100%; border: none; display: block; background: #ffffff;"
    src="<?php echo $iframeSrc; ?>"
    title="Dynamic Drag &amp; Drop Patent Form Builder">
  </iframe>
</div>

