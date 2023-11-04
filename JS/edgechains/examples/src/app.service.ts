import { Injectable } from '@nestjs/common';
import axios from 'axios';

const supabaseUrl = 'https://oupgwveikfucizwknarm.supabase.co/rest/v1/test';
const apiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cGd3dmVpa2Z1Y2l6d2tuYXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMDkyMDIsImV4cCI6MjAxNDU4NTIwMn0.XYHv5a-CaCNQtDEw-OjlO-e7U90f-Exc1bmIjAvx2bQ';
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cGd3dmVpa2Z1Y2l6d2tuYXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMDkyMDIsImV4cCI6MjAxNDU4NTIwMn0.XYHv5a-CaCNQtDEw-OjlO-e7U90f-Exc1bmIjAvx2bQ';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getItems() {
    const response = await axios.get(supabaseUrl, {
      headers: {
        apikey: apiKey,
        Authorization: token,
      },
    });
    return response;
  }
  async createItem(item: string) {
    const response = await axios.post(supabaseUrl, item, {
      headers: {
        apikey: apiKey,
        Authorization: token,
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Failed to create item in Supabase DB');
    }
  }
}
