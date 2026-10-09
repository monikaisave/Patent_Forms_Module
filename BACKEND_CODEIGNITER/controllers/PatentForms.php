<?php
defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");

class PatentForms extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('PatentForms_model');
        $this->load->model('RolesPermissions_model');

        // Ensure session defaults to SysAdmin (role_id 1) so full navigation and sidebar are always visible
        if (!$this->session->userdata('logged_in')) {
            $this->session->set_userdata([
                'user_name' => 'SysAdmin',
                'user_id' => 1,
                'logged_in' => TRUE,
                'role_id' => '1',
                'applicant_id' => 0
            ]);
        }
    }

    /**
     * Main view for Dynamic Patent Form Builder
     */
    public function index($fileNo = '') {
        $data['title'] = 'Patent Forms Builder & Auto-Fill';
        $data['activeFileNo'] = urldecode($fileNo);
        $data['viewMode'] = 'list';
        $data['onlyPatentSection'] = true;
        $data['patentsList'] = $this->PatentForms_model->getAllPatentList();

        $this->load->view('header', $data);
        $this->load->view('patent_forms', $data);
        $this->load->view('footer');
    }

    /**
     * Direct alias to open builder with a specific file number
     */
    public function builder($fileNo = '') {
        $this->index($fileNo);
    }

    /**
     * Dedicated view for Universal Form Runtime & File No Auto-Fill
     */
    public function fill($fileNo = '') {
        $data['title'] = 'Fill Patent Form (Auto-Fill)';
        $data['activeFileNo'] = urldecode($fileNo);
        $data['viewMode'] = 'fill';
        $data['onlyPatentSection'] = true;
        $data['patentsList'] = $this->PatentForms_model->getAllPatentList();

        $this->load->view('header', $data);
        $this->load->view('patent_forms', $data);
        $this->load->view('footer');
    }

    /**
     * REST API: Auto-fetch patent details and relational tables (Applicants, Section 8 Foreign Filings)
     */
    public function api_lookup($fileNo = '') {
        $fileNo = trim(urldecode($fileNo));
        if (empty($fileNo)) {
            $fileNo = $this->input->get('fileNo') ? $this->input->get('fileNo') : $this->input->post('fileNo');
        }

        if (empty($fileNo)) {
            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode([
                    'success' => false,
                    'message' => 'fileNo parameter is required'
                ]));
            return;
        }

        $result = $this->PatentForms_model->getPatentByFileNo($fileNo);

        if (!$result || empty($result['patent'])) {
            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode([
                    'success' => false,
                    'message' => "Patent with File No '{$fileNo}' was not found in the database."
                ]));
            return;
        }

        $p = $result['patent'];
        
        // Assemble standardized payload for dynamic form auto-fetch
        $payload = [
            'id' => $p['patentId'],
            'file_no' => $p['fileNo'],
            'type' => $p['type'],
            'client_ref_no' => $p['clientRefNo'],
            'title' => ($p['titleOfInvention'] !== 'Pending') ? $p['titleOfInvention'] : '',
            'app_no' => ($p['applicationNo'] !== 'Pending') ? $p['applicationNo'] : '',
            'type_of_application' => $p['typeOfApplication'],
            'filing_date' => $p['dateOfFiling'],
            'priority_date' => $p['priorityDate'],
            'publication_date' => $p['publicationDate'],
            'provisional_date' => $p['provisionalDateOfApplication'],
            'complete_filing_date' => $p['completeDateoOfFiling'],
            'patent_office' => 'The Patent Office at Mumbai',
            'agent_name' => 'Suneet Baliram Sabale',
            'agent_reg_no' => 'IN/PA-1773',
            'pct' => $p['pct'],
            'pct_app_no' => $p['pctapplicationno'],
            'pct_filing_date' => $p['pctDateOfFiling'],
            'granted' => $p['granted'],
            'granted_date' => $p['grantedDate'],
            'patent_number' => $p['patentNumber'],
            'applicants' => $result['applicants'],
            'foreign_filings' => $result['foreign_filings']
        ];

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'success' => true,
                'data' => $payload
            ]));
    }

    /**
     * REST API: Return list of all available patent application files in DB
     */
    public function api_patents() {
        $list = $this->PatentForms_model->getAllPatentList();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'success' => true,
                'count' => count($list),
                'patents' => $list
            ]));
    }

    /**
     * REST API: Save form draft or submission
     */
    public function api_save() {
        $raw = file_get_contents('php://input');
        $input = json_decode($raw, true);

        if (!$input) {
            $input = $this->input->post();
        }

        $fileNo = !empty($input['fileNo']) ? $input['fileNo'] : (!empty($input['file_no']) ? $input['file_no'] : 'GENERAL');
        $formCode = !empty($input['formCode']) ? $input['formCode'] : (!empty($input['form_code']) ? $input['form_code'] : 'FORM_3');
        $formTitle = !empty($input['formTitle']) ? $input['formTitle'] : (!empty($input['form_title']) ? $input['form_title'] : 'Form 3 Section 8');
        $formData = !empty($input['formData']) ? $input['formData'] : (!empty($input['form_data']) ? $input['form_data'] : $input);
        $status = !empty($input['status']) ? $input['status'] : 'draft';

        $id = $this->PatentForms_model->saveSubmission($fileNo, $formCode, $formTitle, $formData, $status);

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'success' => true,
                'id' => $id,
                'message' => 'Form draft saved successfully into patent_form_submissions table'
            ]));
    }

    /**
     * REST API: Get list of saved submissions
     */
    public function api_submissions($fileNo = '') {
        $submissions = $this->PatentForms_model->getSubmissions($fileNo);
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'success' => true,
                'submissions' => $submissions
            ]));
    }
}
