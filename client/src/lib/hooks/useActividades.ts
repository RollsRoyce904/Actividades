import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";

export const useActividades = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();
  const location = useLocation();

  const { data: actividades, isLoading } = useQuery({
    queryKey: ['actividades'],
    queryFn: async () => {
      const response = await agent.get<Actividad[]>('/actividades');
      return response.data;
    },
    enabled: !id && location.pathname === '/actividades' && !!currentUser,
    select: (data) => {
      return data.map(actividad => {
        return {
          ...actividad,
          isGoing: actividad.attendees.some(a => a.id === currentUser?.id),
          isHost: currentUser?.id === actividad.hostId
        }
      })
    }
    //staleTime: 1000 * 60 * 5 // 5 minutos
  })

  const { data: actividad, isLoading: isLoadingActividad } = useQuery({
    queryKey: ['actividades', id],
    queryFn: async () => {
      const response = await agent.get<Actividad>(`/actividades/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => {
      return {
        ...data,
        isGoing: data.attendees.some(a => a.id === currentUser?.id),
        isHost: currentUser?.id === data.hostId
      }
    }
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

  const updateAsistir = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/actividades/${id}/asistir`);
    },
    onMutate: async (actividadId: string) => {
      await queryClient.cancelQueries({ queryKey: ['actividades', actividadId] });

      const previousActividad = queryClient.getQueryData<Actividad>(['actividades', actividadId]);
      queryClient.setQueryData<Actividad>(['actividades', actividadId], old => {
        if (!old || !currentUser) return old;

        const isGoing = old.attendees.some(a => a.id === currentUser?.id);
        const isHost = currentUser.id === old.hostId;

        return {
          ...old,
          isCancelado: isHost ? !old.isCancelado : old.isCancelado,
          attendees: isGoing
            ? isHost
              ? old.attendees
              : old.attendees.filter(a => a.id !== currentUser.id)
            : [...old.attendees, { id: currentUser.id, displayName: currentUser.displayName, imageUrl: currentUser.imageUrl }]
        }
      })
      return { previousActividad };
    },
    onError: (error, actividadId, context) => {
      console.log('Error updating attendance', error);
      if (context?.previousActividad) {
        queryClient.setQueryData<Actividad>(['actividades', actividadId], context.previousActividad);
      }
    }
  });


  return {
    actividades,
    isLoading,
    updateActividad,
    createActividad,
    deleteActividad,
    actividad,
    isLoadingActividad,
    updateAsistir
  };
}