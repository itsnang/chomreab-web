/** The three states a teacher can record. Mirrors `AttendanceStatus` in the
 *  API — a student with no record is unmarked, which is the absence of a
 *  value here rather than a fourth state. */
export type Status = 'present' | 'late' | 'absent';
