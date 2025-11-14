import { useState } from 'react'
import api from '../services/api'

export default function TaskForm({ projectId, onSuccess, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('baixa')
  const [assignedTo, setAssignedTo] = useState('')
  const [estimatedHours, setEstimatedHours] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post(`/projects/${projectId}/tasks`, {
        title,
        description,
        due_date: dueDate,
        priority,
        estimated_hours: estimatedHours ? Number(estimatedHours) : undefined,
        assigned_to: assignedTo ? Number(assignedTo) : undefined,
      })
      onSuccess()
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
      alert('Erro ao criar tarefa. Verifique os campos obrigatórios e a data.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block'>Título</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='border px-2 py-1 rounded w-full'
        />
      </div>

      <div>
        <label className='block'>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border px-2 py-1 rounded w-full'
        />
      </div>

      <div>
        <label className='block'>Data de Vencimento</label>
        <input
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className='border px-2 py-1 rounded w-full'
        />
      </div>

      <div>
        <label className='block'>Prioridade</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className='border px-2 py-1 rounded w-full'
        >
          <option value='baixa'>Baixa</option>
          <option value='média'>Média</option>
          <option value='alta'>Alta</option>
        </select>
      </div>

      <div>
        <label className='block'>Horas Estimadas</label>
        <input
          type='number'
          min='1'
          value={estimatedHours}
          onChange={(e) => setEstimatedHours(e.target.value)}
          className='border px-2 py-1 rounded w-full'
        />
      </div>

      <div>
        <label className='block'>Atribuir a Usuário (ID)</label>
        <input
          type='number'
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className='border px-2 py-1 rounded w-full'
        />
      </div>

      <div className='flex gap-2'>
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          Criar
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='bg-gray-300 px-4 py-2 rounded'
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
