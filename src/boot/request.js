import { api } from './axios'
import { apiUrl } from './conf.json'

export function loadData(url) {
  return api
    .get(`${apiUrl}${url}`)
    .then(() => {
      return [
        {
          name: '1st Semster',
          is_active: 0,
          term: '1st',
          year_start: '2023',
          year_end: '2023',
          start_date: '2023-06-20',
          end_date: '2023-11-20',
        },
        {
          name: '2nd Semster',
          is_active: 0,
          term: '2nd',
          year_start: '2023',
          year_end: '2024',
          start_date: '2023-12-20',
          end_date: '2024-03-20',
        },
        {
          name: '1st Semster',
          is_active: 1,
          term: '1st',
          year_start: '2024',
          year_end: '2024',
          start_date: '2024-06-20',
          end_date: '2024-11-20',
        },
        {
          name: '2nd Semester',
          is_active: 0,
          term: '2nd',
          year_start: '2024',
          year_end: '2025',
          start_date: '2024-12-20',
          end_date: '2025-03-20',
        },
      ]
    })
    .catch(() => {
      return 'error'
    })
}
