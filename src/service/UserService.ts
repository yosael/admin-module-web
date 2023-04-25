import { UserRequest, UserResponse } from "../types/User";

export default class UserService {
  public static async getUserInfo(): Promise<UserResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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

  public static async updateUser(userData: UserRequest): Promise<UserResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
}
