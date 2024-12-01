// src/pages/Courses/CourseAssignments.tsx

import { Row as TRow } from "@tanstack/react-table";
import Table from "components/Table/Table";
import React from 'react';
import { assignmentColumns as ASSIGNMENT_COLUMNS } from "../Assignments/AssignmentColumns";

interface CourseAssignmentsProps {
  courseId: number;
  courseName: string;
}

const CourseAssignments: React.FC<CourseAssignmentsProps> = ({ courseId, courseName }) => {
  // Generate fake assignments for this specific course
  const generateFakeAssignments = () => {
    const numAssignments = 3 + Math.floor(Math.random() * 3); // 3-5 assignments per course
    return Array.from({ length: numAssignments }, (_, idx) => ({
      id: parseInt(`${courseId}${idx}`),
      name: `Assignment ${idx + 1} for ${courseName}`,
      courseName: courseName,
      description: "This is a fake assignment",
      created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      updated_at: new Date().toISOString(),
    }));
  };

  const handleEdit = (row: TRow<any>) => {
    console.log('Edit assignment:', row.original);
  };

  const handleDelete = (row: TRow<any>) => {
    console.log('Delete assignment:', row.original);
  };

  const assignmentColumns = ASSIGNMENT_COLUMNS(handleEdit, handleDelete);
  const assignments = generateFakeAssignments();

  return (
    <div className="px-4 py-2 bg-light">
      <h5 className="mb-3">Assignments for {courseName}</h5>
      <Table
        data={assignments}
        columns={assignmentColumns}
        showGlobalFilter={false}
        showColumnFilter={false}
        showPagination={false}
        tableSize={{ span: 12, offset: 0 }}
      />
    </div>
  );
};

export default CourseAssignments;