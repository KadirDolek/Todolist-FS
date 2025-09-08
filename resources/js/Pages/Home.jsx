import React, { useState } from 'react';
import { usePage, useForm, router } from '@inertiajs/react';

const Home = () => {
    const { todos } = usePage().props;
    const [filter, setFilter] = useState('all');
    const [darkMode, setDarkMode] = useState(false);
    
    const { data, setData, post, processing, reset } = useForm({
        title: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/todos', {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const toggleTodo = (todo) => {
        router.post(`/todos/${todo.id}`, {
            completed: !todo.completed,
            _method: 'PUT'
        }, {
            preserveScroll: true
        });
    };

    const deleteTodo = (todo) => {
        router.post(`/todos/${todo.id}`, {
            _method: 'DELETE'
        }, {
            preserveScroll: true
        });
    };


    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });
// Pour compter en mode combien il reste de tâches
    const activeTodosCount = todos.filter(todo => !todo.completed).length;

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
             <div 
                className="w-full h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2022/05/21/03/03/website-7210581_640.png')" }}
            > </div>
            <div className="container mx-auto px-4 py-8 max-w-2xl -mt-24">
                <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">TODO</h1>
                        {/* Ptit darkmode */}
                        <button 
                            className={`p-2 rounded-full text-xl ${darkMode ? 'hover:bg-gray-700 cursor-pointer' : 'hover:bg-gray-200 cursor-pointer'}`}
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </header>
                    {/* Ca aussi c mon commentaire  */}
                    <form onSubmit={submit} className="flex mb-6">
                        <input
                            type="text"
                            placeholder="Ajouter une nouvelle tâche..."
                            className={`flex-grow py-3 px-4 rounded-l-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            // Fonction en mode 'process' genre ca arrive tkt, ca le fait actuellement
                            disabled={processing}
                        />
                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="bg-gradient-to-l from-slate-500 to-amber-500 hover:from-slate-600 hover:to-amber-600 text-white py-3 px-4 rounded-r-lg font-bold disabled:opacity-50 cursor-pointer"
                        >
                            {processing ? 'Ajout de tâches...' : 'Ajouter une tâche'}
                        </button>
                    </form>

                    
                   {/* Petite liste pour voir les tâches à faire tavu */}
                    <div className={`rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-300'} mb-4`}>
                        {filteredTodos.map(todo => (
                            <div key={todo.id} className={`flex items-center p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'} last:border-b-0`}>
                                <div 
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 cursor-pointer transition-colors ${todo.completed ? 'bg-amber-500 border-slate-500 text-white' : darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-400 hover:border-gray-500'}`}
                                    onClick={() => toggleTodo(todo)}
                                >
                                    {todo.completed ? '✓' : ''}
                                </div>
                                <span className={`flex-grow ${todo.completed ? 'line-through text-white' : ''}`}>
                                    {todo.title}
                                </span>
                                <button 
                                    className="text-red-500 hover:text-red-700 text-xl font-bold ml-2 transition-colors cursor-pointer"
                                    onClick={() => deleteTodo(todo)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        
                        {filteredTodos.length === 0 && (
                            <div className="p-4 text-center text-gray-500">
                                {filter === 'all' && 'Aucune tâche pour le moment'}
                                {filter === 'active' && 'Aucune tâche active'}
                                {filter === 'completed' && 'Aucune tâche terminée'}
                            </div>
                        )}
                    </div>
                    
                    <div className={`flex flex-col sm:flex-row justify-between items-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        <span>{activeTodosCount} tâche(s) restante(s)</span>
                        
                        <div className="flex my-2 sm:my-0">
                            <button 
                                className={`px-2 py-1 mx-1 rounded transition-colors ${filter === 'all' ? 'bg-gradient-to-l from-slate-500 to-amber-500 text-white cursor-pointer' : darkMode ? 'hover:bg-gray-700 cursor-pointer' : 'hover:bg-gray-200 cursor-pointer'}`}
                                onClick={() => setFilter('all')}
                            >
                                Toutes
                            </button>
                            <button 
                                className={`px-2 py-1 mx-1 rounded transition-colors ${filter === 'active' ? 'bg-gradient-to-l from-slate-500 to-amber-500 text-white cursor-pointer' : darkMode ? 'hover:bg-gray-700 cursor-pointer' : 'hover:bg-gray-200 cursor-pointer'}`}
                                onClick={() => setFilter('active')}
                            >
                                Actives
                            </button>
                            <button 
                                className={`px-2 py-1 mx-1 rounded transition-colors ${filter === 'completed' ? 'bg-gradient-to-l from-slate-500 to-amber-500 text-white cursor-pointer' : darkMode ? 'hover:bg-gray-700 cursor-pointer' : 'hover:bg-gray-200 cursor-pointer'}`}
                                onClick={() => setFilter('completed')}
                            >
                                Terminées
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;