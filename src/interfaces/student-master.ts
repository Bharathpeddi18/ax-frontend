interface I_StudentMaster {
  id: string
  user_id: string
  student_id: string
  roll_number: string
  class_id: string
  section_id: string
  gender_id: string
  academic_year_id: string
  grade_id: string
  attendance_status: string
  enrollment_status: string
  is_archived: string
  modified_by: string
  modified_date: string
}

export type I_StudentMasterList = I_StudentMaster[]