import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActividades = (id?: string) => {
  const queryClient = useQueryClient();
  const { data: actividades, isPending } = useQuery({
    queryKey: ['actividades'],
    queryFn: async () => {
      const response = await agent.get<Actividad[]>('/actividades');
      return response.data;
    }
  })

  const { data: actividad, isLoading: isLoadingActividad } = useQuery({
    queryKey: ['actividades', id],
    queryFn: async () => {
      const response = await agent.get<Actividad>(`/actividades/${id}`);
      return response.data;
    },
    enabled: !!id
  });


  const updateActividad = useMutation({
    mutationFn: async (actividad: Actividad) => {
      await agent.put('/actividades', actividad)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['actividades'] });
    }
  })

  const createActividad = useMutation({
    mutationFn: async (actividad: Actividad) => {
      const response = await agent.post('/actividades', actividad);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['actividades'] });
    }
  })

  const deleteActividad = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/actividades/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['actividades'] });
    }
  })

  return {
    actividades,
    isPending,
    updateActividad,
    createActividad,
    deleteActividad,
    actividad,
    isLoadingActividad
  };
}