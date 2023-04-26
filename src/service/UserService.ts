import { UserLogged, UserRequest, UserResponse } from "../types/User";

export default class UserService {
  public static async getUserInfo(): Promise<UserResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = (await response.json()) as UserResponse;
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async createUser(userData: UserRequest): Promise<UserResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(userData),
        }
      );
      const data = (await response.json()) as UserResponse;
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async updateUser(
    userId: number,
    userData: UserRequest
  ): Promise<UserResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(userData),
        }
      );
      const data = (await response.json()) as UserResponse;
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async getUserById(userId: number): Promise<UserResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = (await response.json()) as UserResponse;
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteUser(userId: number): Promise<void> {
    try {
      await fetch(`${import.meta.env.VITE_APP_API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public static async getAllUsers(): Promise<UserResponse[]> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("responseData: ", response);
      const data = (await response.json()) as UserResponse[];
      return data;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }

  public static async login(email: string, password: string) {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status !== 200) throw new Error("Invalid credentials");

      if (!result.ok) throw new Error("Invalid credentials");

      const data = (await result.json()) as UserLogged;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
