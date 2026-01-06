import axios, { AxiosInstance } from 'axios'
import { User, LoginRequest, RegisterRequest, Salon, Service, Booking, BookingRequest, Category } from '../types'
import { useAuthStore } from '../store/authStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = useAuthStore.getState().token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout()
        }
        return Promise.reject(error)
      }
    )
  }

  // Auth endpoints
  async login(data: LoginRequest) {
    const response = await this.client.post<{ user: User; token: string }>('/auth/login', data)
    return response.data
  }

  async register(data: RegisterRequest) {
    const response = await this.client.post<{ user: User; token: string }>('/auth/register', data)
    return response.data
  }

  // Salon endpoints
  async getSalons() {
    const response = await this.client.get<Salon[]>('/salons')
    return response.data
  }

  async getSalonById(id: string) {
    const response = await this.client.get<Salon>(`/salons/${id}`)
    return response.data
  }

  // Service endpoints
  async getServices(salonId: string) {
    const response = await this.client.get<Service[]>(`/salons/${salonId}/services`)
    return response.data
  }

  // Category endpoints
  async getCategories() {
    const response = await this.client.get<Category[]>('/categories')
    return response.data
  }

  // Booking endpoints
  async createBooking(data: BookingRequest) {
    const response = await this.client.post<Booking>('/bookings', data)
    return response.data
  }

  async getMyBookings() {
    const response = await this.client.get<Booking[]>('/bookings/my')
    return response.data
  }

  async getBookingById(id: string) {
    const response = await this.client.get<Booking>(`/bookings/${id}`)
    return response.data
  }

  async cancelBooking(id: string) {
    const response = await this.client.put<Booking>(`/bookings/${id}/cancel`)
    return response.data
  }

  // Admin endpoints
  async getAllBookings() {
    const response = await this.client.get<Booking[]>('/admin/bookings')
    return response.data
  }

  async getAllUsers() {
    const response = await this.client.get<User[]>('/admin/users')
    return response.data
  }

  async getAllSalons() {
    const response = await this.client.get<Salon[]>('/admin/salons')
    return response.data
  }

  // Salon Owner endpoints
  async getSalonBookings(salonId: string) {
    const response = await this.client.get<Booking[]>(`/salons/${salonId}/bookings`)
    return response.data
  }

  async addService(salonId: string, data: Omit<Service, 'id' | 'salonId' | 'createdAt'>) {
    const response = await this.client.post<Service>(`/salons/${salonId}/services`, data)
    return response.data
  }

  async updateService(salonId: string, serviceId: string, data: Partial<Service>) {
    const response = await this.client.put<Service>(`/salons/${salonId}/services/${serviceId}`, data)
    return response.data
  }

  async deleteService(salonId: string, serviceId: string) {
    await this.client.delete(`/salons/${salonId}/services/${serviceId}`)
  }
}

export const apiClient = new ApiClient()
