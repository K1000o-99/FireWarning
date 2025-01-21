import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getAllUser } from '../../api/alert.api'
import { useForm, Controller } from 'react-hook-form'

export const LoginPages = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const [loginMessage, setLoginMessage] = useState('')

  const onSubmit = async (data) => {
    try {
      const response = await getAllUser()
      if (response.data) {
        const foundUser = response.data.find(
          (user) =>
            user.username === data.username && user.password === data.password
        )

        if (foundUser) {
          setLoginMessage('Inicio de sesión exitoso')
          login(foundUser.first_name)
          navigate('/alerts-log')
        } else {
          setLoginMessage(
            'Credenciales incorrectas. Por favor, inténtalo de nuevo.'
          )
        }
      } else {
        console.log('No se encontraron usuarios.')
      }
    } catch (error) {
      console.error('Error al buscar usuarios:', error)
      setLoginMessage(
        'Error al iniciar sesión. Por favor, vuelva a intentarlo.'
      )
    }
  }

  return (
    <div className='grid h-[40rem] w-[40rem] grid-cols-2  rounded-xl  border-2 border-slate-400/20 bg-slate-500/5 sm:w-[50rem] lg:w-[60rem]'>
      <secion className='col-span-1  max-lg:hidden'>
        <img
          src='src/assets/img/leftimg.jpg'
          className='h-full rounded-l-xl '
        />
      </secion>
      <section className='col-span-1 flex  items-center justify-center rounded-r-xl  max-lg:col-span-2'>
        <div className='relative h-max min-h-[18rem] w-[25rem] rounded-xl  border-2 border-slate-400/20 bg-slate-400/10 p-7'>
          <span className='absolute right-8 top-5 text-lg font-bold text-slate-200/50'>
            Inicio de Sesión
          </span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-y-7 pt-5'
          >
            <div className='flex flex-col gap-y-2'>
              <div className='flex flex-col gap-y-1'>
                <label className='text-orange-500'>Nombre de usuario</label>
                <div className='flex h-[3rem] flex-col gap-y-1'>
                  <Controller
                    name='username'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Este campo es obligatorio' }}
                    render={({ field }) => (
                      <input
                        type='text'
                        className=' rounded-md px-2 py-1 text-slate-800 placeholder:text-slate-400'
                        {...field}
                      />
                    )}
                  />
                  {errors.username && (
                    <p className='text-sm text-red-500'>
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-y-1'>
                <label className='text-orange-500'>Contraseña</label>
                <div className='flex h-[3rem] flex-col gap-y-1'>
                  {' '}
                  <Controller
                    className=' text-slate-800'
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Este campo es obligatorio' }}
                    render={({ field }) => (
                      <input
                        type='password'
                        className='rounded-md px-2 py-1 text-slate-700 placeholder:text-slate-400'
                        {...field}
                      />
                    )}
                  />
                  {errors.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className='flex w-full justify-end gap-x-2'>
              {loginMessage && (
                <div className='relative h-0 w-[12rem] text-center text-sm text-red-500'>
                  {loginMessage}
                </div>
              )}
              <button
                type='submit'
                className='w-[9rem] scale-95 rounded-md bg-orange-600 px-3 py-2 font-semibold transition-all duration-200 ease-in hover:bg-orange-700 active:bg-orange-600'
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
