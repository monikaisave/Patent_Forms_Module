<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Brainiac IP Solutions | <?php if (isset($title)) echo $title; ?></title>



        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.css" />
        <!-- Bootstrap 3.3.7 -->
        <link rel="stylesheet" href="<?php echo base_url('assets/bower_components/bootstrap/dist/css/bootstrap.min.css'); ?>">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="<?php echo base_url('assets/bower_components/font-awesome/css/font-awesome.min.css'); ?>">
        <!-- Ionicons -->
        <link rel="stylesheet" href="<?php echo base_url('assets/bower_components/Ionicons/css/ionicons.min.css'); ?>">   
        <!-- iCheck for checkboxes and radio inputs -->
        <link rel="stylesheet" href='<?php echo base_url("assets/plugins/iCheck/all.css"); ?>'>
        <!-- Date Picker -->
        <link rel="stylesheet" href="<?php echo base_url('assets/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'); ?>">
        <!-- Theme style -->
        <link rel="stylesheet" href="<?php echo base_url('assets/dist/css/AdminLTE.min.css'); ?>">
        <!-- AdminLTE Skins. Choose a skin from the css/skins    folder instead of downloading all of them to reduce the load. -->
        <link rel="stylesheet" href="<?php echo base_url('assets/dist/css/skins/_all-skins.min.css'); ?>">
        <!-- Custom css -->
        <link rel="stylesheet" href="<?php echo base_url('assets/dist/css/custom.css'); ?>">


        <script src="<?php echo base_url('assets/angular/angular.min.js'); ?>"></script>
        <script src="<?php echo base_url('assets/angular/ui-bootstrap-tpls-1.0.3.js'); ?>"></script>

        <!-- toastr -->
        <script src="<?php echo base_url('assets/angular/angular-toastr.tpls.js'); ?>"></script>

        <link rel="stylesheet" href="<?php echo base_url('assets/angular/angular-toastr.css'); ?>" />

        <script src="<?php echo base_url('assets/angular/angularjs-dropdown-multiselect.min.js') ?>"></script>
        
        <!-- chart.min.js -->
        <script src="<?php echo base_url('assets/dist/js/Chart.min.js'); ?>"></script>
        <!-- angular.chart.js -->
        <script src="<?php echo base_url('assets/angular/angular-charts.min.js'); ?>"></script>

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->


        <!-- jQuery 3 -->
        <script src="<?php echo base_url('assets/bower_components/jquery/dist/jquery.min.js'); ?>"></script>
        <!-- jQuery UI 1.11.4 -->
        <script src="<?php echo base_url('assets/bower_components/jquery-ui/jquery-ui.min.js'); ?>"></script>
        <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
        <script>
            $.widget.bridge('uibutton', $.ui.button);
        </script>
        <!-- Bootstrap 3.3.7 -->
        <script src="<?php echo base_url('assets/bower_components/bootstrap/dist/js/bootstrap.min.js'); ?>"></script>

        <!-- datepicker -->
        <script src="<?php echo base_url('assets/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'); ?>"></script>  

        <script src="<?php echo base_url('assets/js/crypto-js.js');?>"></script>

        <!-- Google Font -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

        <script src="<?php echo base_url('assets/js/html2canvas.js') ?>"></script>
        <link rel="stylesheet" href="<?php echo base_url('assets/angular/angular-toastr.css'); ?>" />
        <script src="<?php echo base_url('assets/js/jquery.toast.min.js') ?>"></script>
        <!-- Page script -->

        <link rel="stylesheet" href="<?php echo base_url('assets/css/fullcalendar.css'); ?>">
        <!-- <link rel="stylesheet" href="<?php //echo base_url('assets/angular/angular-bootstrap-calendar.css'); ?>" /> -->
        
        <script src="<?php echo base_url('assets/angular/xlsx.core.min.js') ?>" type="text/javascript"></script>
        <script src="<?php echo base_url('assets/angular/FileSaver.js') ?>" type="text/javascript"></script>
        
        <!-- daterangepicker -->
        <script src="<?php echo base_url('assets/bower_components/moment/min/moment.min.js');?>"></script>
        
        <script src="<?php echo base_url('assets/dist/js/date.js') ?>"></script>
         
         <script src="<?php echo base_url('assets/dist/js/bootstrap-datetimepicker.min.js') ?>"></script>

 <!-- <script src="<?php //echo base_url('assets/angular/angular-bootstrap-calendar-tpls.js') ?>"></script> -->

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script> -->
  <script src="<?php echo base_url('assets/js/fullcalendar.js');?>"></script>

        <script type="text/javascript">

            $(document).ready(function() {

    $("#eraseBtn").click(function() {
                    var isGood = confirm('Do you want to delete all the data from application?');
                    if (isGood) {
                        $.ajax({
                            url: "<?php echo site_url('Logout/EraseData'); ?>", 
                            success: function(result){
                               
                                    $.toast("Erased Data successfully.");
                                    location.reload();
                                
                            }
                        });
                    }
                    
                });

                 $(document).on('click', '.prevClickGlobal', function() {
                    var i = 0;
                    var GetClientEmail = $(this).attr('getEmail');
                    var getClickAction = $(this).attr('getClickAction');
                    var getId = $(this).attr('getId');
        
        //                    alert(GetClientEmail);
                           // alert(getClickAction);
                           if (getClickAction == "PDF_for_Print") {
                            $("#ModelHeader").css('visibility', 'hidden');
                            $("#ModelFooter").css('visibility', 'hidden');
                        } else {
                            $("#ModelHeader").css('visibility', 'visible');
                            $("#ModelFooter").css('visibility', 'visible');
                        }
        
        
                        $.ajax({
                            url: "<?php echo base_url() . 'index.php/UpdateGlobalInvoice/genPDF' ?>",
                            type: "POST",
                            data: {
                                'ClientEmail': GetClientEmail,
                                'getId': getId,
                                'getClickAction':getClickAction,
                                '<?php echo $this->security->get_csrf_token_name(); ?>': '<?php echo $this->security->get_csrf_hash(); ?>'
                            },
                            success: function(res) {
                                $('#myPdfSpiral').modal('hide');
                                $('#myPdfSpiral').modal('hide');
                                var base = '<?php echo base_url(); ?>';
                                window.open(base + res, '_blank');
                            }
                        });
                    })
            
               $(document).on('click', '.prevClick', function() {
                    var i = 0;
                    var GetClientEmail = $(this).attr('getEmail');
                    var getClickAction = $(this).attr('getClickAction');
                    var getId = $(this).attr('getId');
                  
//                    alert(GetClientEmail);
                   // alert(getClickAction);
                    if (getClickAction == "PDF_for_Print") {
                        $("#ModelHeader").css('visibility', 'hidden');
                        $("#ModelFooter").css('visibility', 'hidden');
                    } else {
                        $("#ModelHeader").css('visibility', 'visible');
                        $("#ModelFooter").css('visibility', 'visible');
                    }

             
                                $.ajax({
                                    url: "<?php echo base_url() . 'index.php/UpdateInvoice/genPDF' ?>",
                                    type: "POST",
                                    data: {
                                        'ClientEmail': GetClientEmail,
                                        'getId': getId,
                                        'getClickAction':getClickAction,
                                        '<?php echo $this->security->get_csrf_token_name(); ?>': '<?php echo $this->security->get_csrf_hash(); ?>'
                                    },
                                    success: function(res) {
                                    $('#myPdfSpiral').modal('hide');
                                        $('#myPdfSpiral').modal('hide');
                                        var base = '<?php echo base_url(); ?>';
                                        window.open(base + res, '_blank');
                                    }
                                });
                        
                        
                 
                })
                
                  $(document).on('click', '.pdfClick', function() {
                    var i = 0;
                  
//                    alert(GetClientEmail);
                   // alert(getClickAction);
                   
              
                    setInterval(function() {
                        if (i == 0)
                        {
                            html2canvas(document.getElementById('imgDivPdf')).then(function(canvas) {
                                document.body.appendChild(canvas);
                                var data = canvas.toDataURL('image/png');
                               
                                $.ajax({
                                    url: "<?php echo base_url() . 'index.php/Savepage/' ?>",
                                    type: "POST",
                                    data: {
                                        'dataimage': data,
                                        '<?php echo $this->security->get_csrf_token_name(); ?>': '<?php echo $this->security->get_csrf_hash(); ?>'
                                    },
                                    success: function(res) {
                                        $('#myModal').modal('hide');
                                        var base = '<?php echo base_url(); ?>';
                                        window.open(base + res, '_blank');
                                    }
                                });
                            });
                            i++;
                        }
                    }, 2000);
                })
            });
        </script>

        <!-- Modern Light Professional UI Theme (Clean White/Light Slate Header & Sidebar) -->
        <style>
            body, .wrapper, .main-sidebar, .left-side {
                background-color: #ffffff !important;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }

            /* Clean Light Top Header (replaces heavy blue line) */
            .skin-blue .main-header .navbar {
                background: #ffffff !important;
                border-bottom: 1px solid #e2e8f0 !important;
                box-shadow: 0 1px 3px rgba(0,0,0,0.04) !important;
                color: #1e293b !important;
            }
            .skin-blue .main-header .navbar .sidebar-toggle {
                color: #475569 !important;
                background: #f8fafc !important;
                border-right: 1px solid #e2e8f0 !important;
                padding: 15px !important;
            }
            .skin-blue .main-header .navbar .sidebar-toggle:hover {
                background-color: #f1f5f9 !important;
                color: #0f172a !important;
            }
            .skin-blue .main-header .navbar .nav > li > a {
                color: #334155 !important;
                font-weight: 600 !important;
            }
            .skin-blue .main-header .navbar .nav > li > a:hover {
                background: #f8fafc !important;
                color: #0f172a !important;
            }

            /* Clean Light Logo Brand Area */
            .skin-blue .main-header .logo {
                background: #ffffff !important;
                color: #0f172a !important;
                border-bottom: 1px solid #e2e8f0 !important;
                border-right: 1px solid #e2e8f0 !important;
                box-shadow: none !important;
                font-weight: 800 !important;
            }
            .skin-blue .main-header .logo:hover {
                background: #f8fafc !important;
            }

            /* Clean Light Professional Sidebar - Richer Blue Tone */
            .skin-blue .main-sidebar, .skin-blue .left-side {
                background-color: #cbe2fc !important;
                border-right: 1px solid #93c5fd !important;
                box-shadow: 2px 0 10px rgba(30,58,138,0.08) !important;
            }
            .skin-blue .sidebar-menu > li.header {
                background: #b4d5fa !important;
                color: #0b2559 !important;
                border-bottom: 1px solid #93c5fd !important;
                font-size: 11px !important;
                font-weight: 800 !important;
                letter-spacing: 0.8px !important;
                text-transform: uppercase !important;
                padding: 14px 18px 8px 18px !important;
            }
            .skin-blue .sidebar-menu > li > a {
                color: #0f2b5c !important;
                font-weight: 600 !important;
                border-left: 4px solid transparent !important;
                transition: all 0.15s ease !important;
            }
            .skin-blue .sidebar-menu > li:hover > a {
                background-color: #bedbfc !important;
                color: #0a224a !important;
            }
            .skin-blue .sidebar-menu > li.active > a, 
            .skin-blue .sidebar-menu > li.menu-open > a {
                background-color: #b4d5fa !important;
                color: #0b2559 !important;
                border-left-color: #1d4ed8 !important;
                font-weight: 700 !important;
            }
            .skin-blue .sidebar-menu .treeview-menu {
                background: #d5e7fd !important;
                padding: 6px 0 !important;
                border-left: 1px solid #93c5fd !important;
            }
            .skin-blue .sidebar-menu .treeview-menu > li > a {
                color: #0f2b5c !important;
                font-size: 13px !important;
                font-weight: 600 !important;
                padding: 9px 15px 9px 24px !important;
                transition: all 0.15s ease !important;
            }
            .skin-blue .sidebar-menu .treeview-menu > li > a:hover {
                color: #0a224a !important;
                background-color: #bedbfc !important;
            }
            .skin-blue .sidebar-menu .treeview-menu > li.active > a {
                color: #0b2559 !important;
                background-color: #9ec7f8 !important;
                font-weight: 700 !important;
                border-left: 4px solid #1d4ed8 !important;
            }

            /* Content Area Light Theme */
            .content-wrapper, .right-side {
                background-color: #f8fafc !important;
            }
        </style>

    </head>
    <body class="hold-transition skin-blue sidebar-mini">
        <div class="wrapper">

            <header class="main-header">
                <!-- Logo -->
                <a href="<?php echo site_url('Dashboard'); ?>" class="logo">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini"><b>B</b>IP</span>
                    <!-- logo for regular state and mobile devices -->      
                    <span class="logo-lg"><img src=<?php echo base_url("assets/dist/img/logo.png"); ?> alt="Brainiac IP Solutions"></span>
                </a>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">



                            <!-- User Account: style can be found in dropdown.less -->
                            <li class="dropdown user">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">              
                                    <span class="hidden-xs"><?php echo $this->session->userdata('user_name') ? ucfirst($this->session->userdata('user_name')) : 'SysAdmin'; ?></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <!-- <li><a href="#" id="eraseBtn" class=""> <i class="fa fa-trash text-red"> Erase All Data</i></a></li> -->
                                    <?php if($this->session->userdata('role_id') != 3){ ?>
                                    
                                    <li><a href="<?php echo site_url('ChangePassword') ?>" class=""> <i class="fa fa-key text-yellow"> Change Password</i></a></li>
                                    <?php } ?>
                                    
                                    <li><a href="<?php echo site_url('Logout'); ?>" class=""><i class="fa fa-sign-out text-red"> Sign out</i></a></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </nav>
            </header>
            <!-- Left side column. contains the logo and sidebar -->
            <aside class="main-sidebar" ng-app="headerApp" ng-controller="headerCtrl" >
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">

                    <!-- sidebar menu: : style can be found in sidebar.less -->
                    <ul class="sidebar-menu" data-widget="tree">
                        <li class="header">MAIN NAVIGATION</li>

                    <?php
                        $newdata = $this->session->all_userdata();
                        // Enforce ONLY Patent Section visible on left side navigation menu
                        $isPatentOnly = isset($onlyPatentSection) ? $onlyPatentSection : true;
                    ?>

                    <?php if (empty($isPatentOnly)): ?>
                        <li class="menu" id="adminSection" ng-if='adminSection'>
                            <a href="<?php echo site_url('Dashboard'); ?>">
                                <i class="fa fa-dashboard"></i> <span>Admin Dashboard</span>
                            </a>
                        </li>
        
                        <li class="menu" id="clientSection" ng-if='clientSection'>
                          <a href="<?php echo site_url('Dashboard/clientDashboard'); ?>">
                              <i class="fa fa-dashboard"></i> <span>Financial Dashboard</span>
                          </a>
                        </li>

                        <li class="menu" id="projectSection" ng-if='projectSection'>
                          <a href="<?php echo site_url('Dashboard/projectManagementDashboard'); ?>">
                              <i class="fa fa-dashboard"></i> <span>Project Manager Dashboard</span>
                          </a>
                        </li>
                        <li class="menu" id="projectSection" ng-if='projectSection'>
                          <a href="<?php echo site_url('Dashboard/projectManagementSecondDashboard'); ?>">
                              <i class="fa fa-dashboard"></i> <span>FF Project Manager Dashboard</span>
                          </a>
                        </li>
                        <li ng-if="applicants" class="menu" id="addApplicant">
                            <a href="<?php echo site_url("Applicant"); ?>">
                                <i class="fa fa-user-plus"></i> <span>Applicants</span>            
                            </a>
                        </li>
                        <li class="menu" id="leaves" ng-if="leaves">
                            <a href='<?php echo site_url("Leaves") ?>'>
                                <i class="fa fa-dashboard"></i> <span>Leave Management Dashboard</span>       
                            </a>
                        </li>
                    <?php endif; ?>

                        <?php 
                            $isPatentActive = in_array($this->uri->segment(1), ['PatentForms', 'AddPatentDesign', 'UpdatePatent', 'Reminder']);
                        ?>
                        <li class="treeview menuSection <?php echo $isPatentActive ? 'active menu-open' : ''; ?>" id="patentSection" ng-if="patentSection">
                            <a href="#">
                                <i class="fa fa-certificate"></i>
                                <span>Patent Section</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu" <?php echo $isPatentActive ? 'style="display: block;"' : ''; ?>>
                                <li class="menu <?php echo ($this->uri->segment(1) == 'AddPatentDesign') ? 'active' : ''; ?>" id="addPatent" ng-if="addPatent">
                                    <a href="<?php echo site_url("AddPatentDesign"); ?>"><i class="fa fa-files-o"></i> <span>Add Patent/Design Application</span>              
                                    </a>
                                </li>
                                <li class="menu <?php echo ($this->uri->segment(1) == 'UpdatePatent') ? 'active' : ''; ?>" id="patentList" ng-if="listPatent">
                                    <a href=<?php echo site_url("UpdatePatent"); ?>>
                                        <i class="fa fa-table"></i> <span>Patent/Design List</span>                  
                                    </a>
                                </li>
                                <li class="menu <?php echo ($this->uri->segment(1) == 'Reminder') ? 'active' : ''; ?>" id="patentReminder" ng-if="reminderPatent">
                                    <a href=<?php echo site_url("Reminder"); ?>>
                                        <i class="fa fa-envelope"></i> <span>Reminder Panel</span>                
                                    </a>
                                </li>
                                <li class="menu <?php echo ($this->uri->segment(1) == 'PatentForms' && empty($this->uri->segment(2))) ? 'active' : ''; ?>" id="patentForms">
                                    <a href="<?php echo site_url("PatentForms"); ?>" style="<?php echo ($this->uri->segment(1) == 'PatentForms' && empty($this->uri->segment(2))) ? 'font-weight: bold; color: #00a65a;' : ''; ?>">
                                        <i class="fa fa-wpforms" style="color: #00a65a;"></i> <span>Patent Forms Builder</span>
                                    </a>
                                </li>
                                <li class="menu <?php echo ($this->uri->segment(2) == 'fill') ? 'active' : ''; ?>" id="patentFormFill">
                                    <a href="<?php echo site_url("PatentForms/fill"); ?>" style="<?php echo ($this->uri->segment(2) == 'fill') ? 'font-weight: bold; color: #0284c7;' : ''; ?>">
                                        <i class="fa fa-file-text-o" style="color: #0284c7;"></i> <span>Fill Patent Form (Auto-Fill)</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                    <?php if (empty($isPatentOnly)): ?>
                        <!--Trademark Navigation-->
                      <li class="treeview menuSection" id="trademarkSection" ng-if="trademarkSection">
                            <a href="#">
                                <i class="fa fa-trademark"></i>
                                <span>Trademark Section</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">

                                <li class="menu" id="addTrademark" ng-if="addTrademark">
                                    <a href=<?php echo site_url("Trademark"); ?>>
                                        <i class="fa fa-files-o"></i> <span>Add Trademark Application</span>
                                    </a>
                                </li>

                                <li class="menu" id="trademarkList" ng-if="listTrademark">
                                    <a href="<?php echo site_url("TmViewclientlist"); ?>">
                                        <i class="fa fa-table"></i> <span>Trademark List</span>            
                                    </a>
                                </li>

                                <li class="menu" id="trademarkReminder" ng-if="reminderTrademark">
                                    <a href=<?php echo site_url("TmReminder"); ?>>
                                        <i class="fa fa-envelope"></i> <span>Reminder Panel</span>
                                    </a>
                                </li>
                            </ul> 
                        </li>

                       
                        <li class="treeview menuSection" id="invoiceSection" ng-if="invoiceSection">
                            <a href="#">
                                <i class="fa fa-file"></i>
                                <span>IP Invoice Section</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                <li class="menu" id="addInvoice">
                                    <a href='<?php echo site_url("Invoice"); ?>'>
                                        <i class="fa fa-envelope"></i> <span>Create Invoice/Quotation</span>           
                                    </a>
                                </li>
                                <li class="menu" id="invoiceList">
                                    <a href='<?php echo site_url("UpdateInvoice"); ?>'>
                                        <i class="fa fa-envelope"></i> <span>Update Invoice/Quotation</span>           
                                    </a>
                                </li>
                                
                                <!-- <li class="menu" id="invoiceReport">
                                    <a href='<?php echo site_url("InvoiceReport"); ?>'>
                                        <i class="fa fa-envelope"></i> <span>Invoice Report</span>           
                                    </a>
                                </li>-->
                            </ul>
                        </li>

                        <li class="menu" id="Send_Payment_Link" ng-if="paymentLink">
                            <a href="<?php echo site_url('Send_Payment_Link'); ?>">
                                <i class="fa fa-share "></i> <span>Send Payment Link</span>
                            </a>
                        </li>

                        <li class="treeview menuSection" id="projectManagement"  ng-if="projectMgmntHeader">
                        
                            <a href="#">
                                <i class="fa fa-credit-card"></i>
                                <span>Project Management</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu" >
                                <li class="menu" id="projectType" ng-if="projectType">
                                    <a href='<?php echo site_url("ProjectTypes") ?>'>
                                        <i class="fa fa-list"></i> <span>Project Types</span>       
                                    </a>
                                </li>
                                <li class="menu" id="project" ng-if="project">
                                    <a href='<?php echo site_url("Projects") ?>'>
                                        <i class="fa fa-table"></i> <span>Manage Projects</span>       
                                    </a>
                                </li>

                                <li class="menu" id="leaves" ng-if="leaves">
                                    <a href='<?php echo site_url("Leaves") ?>'>
                                        <i class="fa fa-calendar"></i> <span>Manage Leaves</span>       
                                    </a>
                                </li>
                                
                                <li class="menu" id="calendar" ng-if="calendar">
                                    <a href='<?php echo site_url("Calendar") ?>'>
                                        <i class="fa fa-calendar"></i> <span>Calendar</span>       
                                    </a>
                                </li>

                            </ul>
                        </li>
               
                        <li class="treeview menuSection" id="projectManagementSecond"  ng-if="projectMgmntHeader">
                        
                            <a href="#">
                                <i class="fa fa-credit-card"></i>
                                <span>FF Project Management</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu" >
                                <li class="menu" id="projectTypeSecond" ng-if="projectType">
                                    <a href='<?php echo site_url("ProjectTypes/ProjectTypesViewSecond") ?>'>
                                        <i class="fa fa-list"></i> <span>FF Project Types</span>       
                                    </a>
                                </li>
                                <li class="menu" id="projectSecond" ng-if="project">
                                    <a href='<?php echo site_url("Projects/ProjectsViewSecond") ?>'>
                                        <i class="fa fa-table"></i> <span>FF Manage Projects</span>       
                                    </a>
                                </li>

                            </ul>
                        </li>
                            <!-- <li class="treeview menuSection" id="SendPaymentLinkSection" ng-if="paymentSection">
                                <a href="#">
                                    <i class="fa fa-credit-card"></i>
                                    <span>Send Payment Link</span>
                                    <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                    </span>
                                </a>
                                <ul class="treeview-menu">
                                    <li class="menu" id="Send_Payment_Link">
                                        <a href='<?php //echo site_url("Send_Payment_Link"); ?>'>
                                            <i class="fa fa-share"></i> <span>Send Payment Link</span>           
                                        </a>
                                    </li>
                                  
                                </ul>
                            </li> -->

                            
                            
                            <li class="header" ng-if="userMgnmtHeader">User Management</li>
                            
                            <li class="treeview menuSection" id="userManagement"  ng-if="userMgmntHeader">
                                <a href="#">
                                    <i class="fa fa-credit-card"></i>
                                    <span>User Management</span>
                                    <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                    </span>
                                </a>
                                <ul class="treeview-menu" >
                                    <li class="menu" id="roles" ng-if="rolesMgmnt">
                                        <a href='<?php echo site_url("RolesPermissions"); ?>'>
                                            <i class="fa fa-share"></i> <span>Roles and Permissions</span>           
                                        </a>
                                    </li>
                                    <li class="menu" id="users" ng-if="usersMgmnt">
                                        <a href='<?php echo site_url("Users"); ?>'>
                                            <i class="fa fa-share"></i> <span>Users</span>           
                                        </a>
                                    </li>

                                    <li class="menu" id="activity" ng-if="activityLogs">
                                        <a href='<?php echo site_url("ActivityLogs"); ?>'>
                                            <i class="fa fa-share"></i> <span>Users Activity Logs</span>           
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            
                            <li class="treeview menuSection" id="leaveManagement"  ng-if="leaveManagement">
                                <a href="#">
                                    <i class="fa fa-credit-card"></i>
                                    <span>Leave Management</span>
                                    <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                    </span>
                                </a>
                                <ul class="treeview-menu" >

                                    <li class="menu" id="myLeave" ng-if="myLeave">
                                        <a href='<?php echo site_url("Leaves_indivisual"); ?>'>
                                            <i class="fa fa-user"></i> <span>My Leaves</span>           
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            
                             <li class="treeview menuSection" id="globalInvoiceSection" ng-if="globalInvoiceSection">
                                <a href="#">
                                    <i class="fa fa-file"></i>
                                    <span>Global Invoice Section</span>
                                    <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                    </span>
                                </a>
                                <ul class="treeview-menu">
                                    <li class="menu" id="addGlobalInvoice" ng-if="addGlobalInvoice">
                                        <a href='<?php echo site_url("GlobalInvoice"); ?>'>
                                            <i class="fa fa-envelope"></i> <span>Create Invoice/Quotation</span>           
                                        </a>
                                    </li>
                                    <li class="menu" id="GlobalInvoiceList" ng-if="GlobalInvoiceList">
                                        <a href='<?php echo site_url("UpdateGlobalInvoice"); ?>'>
                                            <i class="fa fa-envelope"></i> <span>Update Invoice/Quotation</span>           
                                        </a>
                                    </li>
    
                                </ul>
                             </li>    
                            <li class="menu" id="PCTNewSection" ng-if="PCTNewSection">
                                <a href="<?php echo site_url('PCTApplication'); ?>">
                                    <i class="fa fa-share "></i> <span>PCT Application</span>
                                </a>
                            </li>

                        <?php
                                           
                        // if ($newdata['role_id'] == 3) {
                            ?>
                           
                            <li class=" viewpat" ng-if="viewpatent">
                                <a href='<?php echo site_url("Clientpatent/getPatent") ?>'>
                                    <i class="fa fa-table"></i> <span>View Patents</span>       
                                </a>
                            </li>
                            

                            <?php
                        // }
                        ?>
                    <?php endif; ?>

                    </ul>
                </section>
                <!-- /.sidebar -->
            </aside>



<input type="hidden" id="csrfHash" value="<?php echo $this->security->get_csrf_hash(); ?>">
<script>

    var happ = angular.module('headerApp', []);

    happ.controller('headerCtrl', function($http, $scope){

        // Default all sections to true so the original admin sidebar navigation is always fully visible
        $scope.dashboardSection = true;
        $scope.adminSection = true;
        $scope.projectSection = true;
        $scope.clientSection = true;
        $scope.applicants = true;        
        $scope.patentSection = true;
        $scope.addPatent = true;
        $scope.listPatent = true;
        $scope.reminderPatent = true;
        $scope.PCTNewSection = true;

        $scope.trademarkSection = true;
        $scope.addTrademark = true;
        $scope.listTrademark = true;
        $scope.reminderTrademark = true;

        $scope.invoiceSection = true;
        $scope.createInvoice = true;
        $scope.updateInvoice = true;

        $scope.paymentLink = true;
        $scope.projectMgmntHeader = true;
        $scope.projectType = true;
        $scope.project = true;
        $scope.leaves = true;

        $scope.userMgmntHeader = true;
        $scope.usersMgmnt = true;
        $scope.rolesMgmnt = true;
        $scope.activityLogs = true;

        $scope.leaveManagement = true;
        $scope.myLeave = true;
        $scope.calendar = true;
        $scope.policy = true;

        $scope.globalInvoiceSection = true;
        $scope.addGlobalInvoice = true;
        $scope.GlobalInvoiceList = true;

        <?php
        $roleIds = $this->session->userdata('role_id');
        if (empty($roleIds)) {
            $roleIds = '1';
        }
        $roles = explode(",", $roleIds);
        foreach ($roles as $role) {?>
        $scope.role_id = '<?php echo !empty($role) ? $role : "1" ?>';

        if ($scope.role_id == 1) {
            $scope.dashboardSection = true;
            $scope.adminSection = true;
            $scope.projectSection = true;
            $scope.clientSection = true;
            $scope.applicants = true;        
            $scope.patentSection = true;
            $scope.addPatent = true;
            $scope.listPatent = true;
            $scope.reminderPatent = true;

            $scope.trademarkSection = true;
            $scope.addTrademark = true;
            $scope.listTrademark = true;
            $scope.reminderTrademark = true;
            
            $scope.invoiceSection = true;
            $scope.createInvoice = true;
            $scope.updateInvoice = true;

            $scope.paymentLink = true;

            $scope.projectMgmntHeader = true;
            $scope.projectType = true;
            $scope.project = true;
            $scope.leaves = true;

            $scope.userMgmntHeader = true;
            $scope.usersMgmnt = true;
            $scope.rolesMgmnt = true;
            $scope.activityLogs = true;
            
            $scope.leaveManagement = true;
            $scope.myLeave = true;
            $scope.calendar = true;
            $scope.policy = true;
            
            $scope.globalInvoiceSection = true;
            $scope.addGlobalInvoice = true;
            $scope.GlobalInvoiceList = true;
            
            $scope.PCTNewSection = true;
        }
        if ($scope.role_id == 2) {
            $scope.dashboardSection = true;
            $scope.adminSection = true;
            // $scope.projectSection = false;
            $scope.invoiceSection = true;
            $scope.updateInvoice = true;
            $scope.policy = true;
            $scope.globalInvoiceSection=true;
            
        }
        
        if ($scope.role_id == 3) {
            $scope.dashboardSection = true;
            $scope.clientSection = true;
            $scope.viewpatent = true;
            $scope.policy = true;
        }
        // Sr. Manager
        if ($scope.role_id == 4) {
            $scope.dashboardSection = true;
            // $scope.adminSection = false;
            $scope.projectSection = true;
            $scope.projectMgmntHeader = true;
            $scope.projectType = true;
            $scope.project = true;
            $scope.userMgmntHeader = true;
            $scope.usersMgmnt = true;       
            $scope.calendar = true;   
            $scope.leaveManagement = true;
            $scope.leaves = true;
            $scope.myLeave = true;
            $scope.policy = true;
        }

        // Manager
        if ($scope.role_id == 5) {       
            $scope.dashboardSection = true;
            // $scope.adminSection = false;
            $scope.projectSection = true;    
            $scope.projectMgmntHeader = true; 
            $scope.project = true;
            $scope.userMgmntHeader = true;
            $scope.usersMgmnt = true;    
            $scope.calendar = true; 
            $scope.leaveManagement = true;
            $scope.leaves = true;
            $scope.myLeave = true;
            $scope.policy = true;
        }

        // Executives
        if ($scope.role_id == 6) {
            $scope.dashboardSection = true;
            // $scope.adminSection = false;
            $scope.projectSection = true;
            $scope.projectMgmntHeader = true;      
            $scope.project = true; 
            $scope.calendar = true;
            $scope.leaveManagement = true;
            $scope.leaves = true;
            $scope.myLeave = true;
            $scope.policy = true;
        }

        var transform = function(data) {
            return $.param(data);
        }

        $http.post('<?php echo site_url('RolesPermissions/GetAllowedScreens') ?>', {
            '<?php echo $this->security->get_csrf_token_name(); ?>': '<?php echo $this->security->get_csrf_hash(); ?>',
            'role_id': $scope.role_id
        }, 
        {
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).then((response) => {
            console.log("Screen :", response);
            angular.forEach(response.data, (value)=> {
                console.log(response.data);
                if(value['permission_screen_name'] == 'Applicants') {
                    $scope.applicants = true;
                }
                    
                if(value['permission_screen_name'] == "Add Patent/Design Application") {
                    $scope.patentSection = true;
                    $scope.addPatent = true;
                }

                if(value['permission_screen_name'] == 'Patent/Design List') {
                    $scope.patentSection = true;
                    $scope.listPatent = true;
                }

                if(value['permission_screen_name'] == 'Patent Reminder') {
                    $scope.patentSection = true;
                    $scope.reminderPatent = true;
                }

                if(value['permission_screen_name'] == "Add Trademark Application") {
                    $scope.trademarkSection = true;
                    $scope.addTrademark = true;
                }

                if(value['permission_screen_name'] == 'Trademark List') {
                    $scope.trademarkSection = true;
                    $scope.listTrademark = true;
                }

                if(value['permission_screen_name'] == 'Trademark Reminder') {
                    $scope.trademarkSection = true;
                    $scope.reminderTrademark = true;
                }

                if(value['permission_screen_name'] == 'Create Invoice/Quotation') {
                    $scope.invoiceSection = true;
                    $scope.addInvoice = true;
                }

                if(value['permission_screen_name'] == 'Update Invoice/Quotation') {
                    $scope.invoiceSection = true;
                    $scope.updateInvoice = true;
                }

                if(value['permission_screen_name'] == 'Send Payment Link') {                    
                    $scope.paymentLink = true;
                }
                
                if(value['permission_screen_name'] == 'Create Global Invoice/Quotation') {
                    $scope.globalInvoiceSection = true;
                    $scope.addGlobalInvoice = true;
                }

                if(value['permission_screen_name'] == 'Update Global Invoice/Quotation') {
                    $scope.globalInvoiceSection = true;
                    $scope.GlobalInvoiceList = true;
                }


            });
        })

        <?php } ?>

        <?php if (!empty($isPatentOnly)): ?>
        // Strictly show ONLY Patent Section on left side navigation menu
        $scope.dashboardSection = false;
        $scope.adminSection = false;
        $scope.projectSection = false;
        $scope.clientSection = false;
        $scope.applicants = false;
        $scope.leaves = false;
        $scope.trademarkSection = false;
        $scope.addTrademark = false;
        $scope.listTrademark = false;
        $scope.reminderTrademark = false;
        $scope.invoiceSection = false;
        $scope.createInvoice = false;
        $scope.updateInvoice = false;
        $scope.paymentLink = false;
        $scope.projectMgmntHeader = false;
        $scope.projectType = false;
        $scope.project = false;
        $scope.userMgmntHeader = false;
        $scope.usersMgmnt = false;
        $scope.rolesMgmnt = false;
        $scope.activityLogs = false;
        $scope.leaveManagement = false;
        $scope.myLeave = false;
        $scope.calendar = false;
        $scope.policy = false;
        $scope.globalInvoiceSection = false;
        $scope.addGlobalInvoice = false;
        $scope.GlobalInvoiceList = false;
        $scope.PCTNewSection = false;
        $scope.viewpatent = false;

        $scope.patentSection = true;
        $scope.addPatent = true;
        $scope.listPatent = true;
        $scope.reminderPatent = true;
        <?php endif; ?>

    });
</script>

